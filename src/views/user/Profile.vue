<template>
  <v-container class="pa-3" fluid>
    <v-form>
      <!-- <v-col cols="3" class="pa-0">
          <v-card class="rounded-lg pa-0">
           <template v-slot:append>
              <v-btn icon="" size="small">
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp, image/webp"
                  label="Edit new profile"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  counter
                  show-size
                  chips
                  hide-details
                  density="compact"
                  hide-input=""
                  color="primary"
                ></v-file-input>
              </v-btn>
            </template>
            <v-card-text class="px-0 text-center">
              <v-col>
                <div>
                  <v-avatar
                    color="grey"
                    rounded="100"
                    size="282"
                    class="avatar elevation-1"
                  >
                   <v-img
                      :src="user.profile"
                      alt="John"
                    ></v-img> 
                  </v-avatar>
                </div>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col> -->
      <v-card class="card pa-2 rounded-lg">
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-text-field
              density="compact"
              v-model="authUser.username"
              label="Username"
              variant="outlined"
              prepend-inner-icon="mdi-card-account-details-outline"
              readonly
              color="textField"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-text-field
              color="textField"
              density="compact"
              :label="$t('common.gender')"
              variant="outlined"
              readonly
              prepend-inner-icon="mdi-gender-male-female"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" lg="6">
            <v-date-input
              color="textField"
              v-model="authUser.username"
              density="compact"
              :label="$t('common.dateOfBirth')"
              variant="outlined"
              readonly
              prepend-icon=""
              prepend-inner-icon="mdi-calendar-range"
              hide-actions
            ></v-date-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-text-field
              color="textField"
              v-model="authUser.email"
              density="compact"
              :label="$t('common.email')"
              variant="outlined"
              prepend-inner-icon="mdi-email"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-text-field
              color="textField"
              v-model="authUser.phone_number"
              density="compact"
              :label="$t('common.phoneNumer')"
              variant="outlined"
              readonly
              prepend-inner-icon="mdi-phone"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" lg="12">
            <v-text-field
              color="textField"
              density="compact"
              :label="$t('common.address')"
              variant="outlined"
              readonly
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
  import { mapActions, mapState } from 'pinia'
  import { useAuthStore } from '../../stores/auth'

  export default {
    name: 'Profile',
    data() {
      return {}
    },
    computed: {
      ...mapState(useAuthStore, ['authUser'])
    },
    methods: {
      ...mapActions(useAuthStore, ['getUser'])
    },
    created() {
      this.getUser()
    }
  }
</script>
