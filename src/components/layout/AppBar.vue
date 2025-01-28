<template>
  <v-app-bar scroll-behavior="inverted">
    <v-card-title class="ms-5">
      <v-avatar size="70" class="cursor-pointer" @click="backHome()">
        <img width="45" src="/ss_logo.avif" alt="" cover />
      </v-avatar>
    </v-card-title>
    <v-col cols="5" class="text-start">
      <v-text-field
        label="Search..."
        v-model="filter"
        variant="outlined"
        hide-details
        density="compact"
        @input="applyFilter"
      ></v-text-field>
    </v-col>
    <v-col class="badge">
      <v-badge
        :content="carts.length"
        @click="myCart()"
        class="cursor-pointer"
        color="green"
      >
        <v-icon icon="mdi-bell" size="x-large"></v-icon>
      </v-badge>
    </v-col>
    <template v-slot:append>
      <div v-if="!isLoggedIn" width="560px">
        <v-btn
          color="orange"
          variant="outlined"
          @click="openSignInDialog"
          rounded="lg"
        >
          Sing In
        </v-btn>
        <v-btn
          rounded="lg"
          class="ms-3 bg-orange text-white"
          @click="openRegisterDialog"
        >
          Register
        </v-btn>
      </div>

      <div v-else>
        <v-menu v-model="menu">
          <template v-slot:activator="{ props }">
            <v-list v-if="authUser.name != undefined">
              <v-list-item>
                <template v-slot:append>
                  <v-list-item-title class="me-3 text-uppercase">
                    {{ authUser.name }}
                  </v-list-item-title>
                  <v-btn v-bind="props" class="me-0" stacked>
                    <v-avatar
                      size="large"
                      class="avatar"
                      v-if="authUser.profile"
                    >
                      <v-img
                        :src="authUser.profile"
                        alt="Avatar"
                        cover
                      ></v-img>
                    </v-avatar>
                    <v-avatar size="large" class="avatar" v-else>
                      <v-img
                        src="https://cdn-icons-png.flaticon.com/512/3276/3276535.png"
                        alt="Avatar"
                        cover
                      ></v-img>
                    </v-avatar>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
            <v-skeleton-loader
              v-else
              type="list-item-avatar"
            ></v-skeleton-loader>
          </template>

          <v-divider></v-divider>

          <v-list :lines="false" width="230" rounded="lg">
            <v-list-item
              v-for="(item, i) in profileItems"
              :key="i"
              :value="item"
              color="primary"
              :to="item.path"
              @click="onMenuClick(item.action)"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
  <SignInDialog ref="signInDialog" />
  <register-dialog ref="registerDialog" />
</template>


<script>
  import { useAuthStore } from '@/stores/auth'
  import RegisterDialog from './../auth/RegisterDialog.vue'
  import SignInDialog from './../auth/SignInDialog.vue'
  import { mapActions, mapState } from 'pinia'
  import { useCartStore } from '../../stores/cart'
  export default {
    name: 'Appbar',
    emits: ['toggle'],
    components: {
      RegisterDialog,
      SignInDialog
    },
    data: () => ({
      menu: false,
      loading: true,
      loged: true,
    }),
    created() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.getUser()
        this.getCarts()
      }
    },

    computed: {
      ...mapState(useAuthStore, ['authUser', 'isAuthenticated']),
      ...mapState(useCartStore, ['carts']),
      isLoggedIn() {
        return this.isAuthenticated || !!localStorage.getItem('authToken')
      },

      profileItems() {
        return [
          {
            text: this.$t('navigation.profile'),
            icon: 'mdi-account',
            path: '/user'
          },
          {
            text: this.$t('navigation.security'),
            icon: 'mdi-lock-check-outline',
            action: 'changePassword'
          },
          {
            text: this.$t('navigation.logout'),
            icon: 'mdi-logout',
            action: 'logout'
          }
        ]
      }
    },

    methods: {
      ...mapActions(useAuthStore, ['logout', 'getUser']),
      ...mapActions(useCartStore, ['getCarts']),
      myCart() {
        this.$router.push('/user/my-cart')
      },
      openRegisterDialog() {
        this.$refs.registerDialog.openDialog()
      },
      openSignInDialog() {
        this.$refs.signInDialog.openDialog()
      },
      backHome() {
        this.$router.push({ path: '/' })
      },
      logoutUser() {
        this.$root.$confirm({
          title: 'Are you sure?',
          message: 'Are you sure you want to logout?',
          options: {
            agreeBtnText: 'Yes',
            type: 'error',
            color: 'error',
            width: 400
          },
          agree: () =>
            this.logout().then(response => {
              if (response.status === 200) {
                localStorage.removeItem('authToken')
                this.$root.$notif('Logout successfully', {
                  type: 'success',
                  color: 'primary'
                })
              }
            })
        })
      },
      onMenuClick(action) {
        console.log(this.dialogVisible)
        switch (action) {
          case 'logout':
            this.logoutUser()
            break
          case 'changePassword':
            this.dialogVisible = true
            break
          default:
            break
        }
      }
    }
  }
</script>
<style scoped>
  .badge {
    display: flex;
    justify-content: end;
  }
</style>
