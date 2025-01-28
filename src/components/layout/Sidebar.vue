<template>
  <v-navigation-drawer elevation="1" v-model="drawer">
    <template v-slot:prepend>
      <v-list class="mb-4 py-4">
        <v-list-item>
          <v-img class="image" src="/ss_logo.avif"></v-img>
        </v-list-item>
      </v-list>
    </template>
    <v-list
      v-model:opened="open"
      v-for="(link, i) in menus"
      :key="link.title"
      dense
      class="pa-0"
    >
      <v-list-item
        v-if="!link.subLinks"
        :key="i"
        :to="link.path"
        class="v-list-item"
        exact
      >
        <template v-slot:prepend>
          <v-icon :icon="link.icon"></v-icon>
        </template>
        <v-list-item-title>
          {{ link.title }}
        </v-list-item-title>
      </v-list-item>

      <v-list-group v-else :key="link.title" no-action class="pa-0">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <v-icon :icon="link.icon"></v-icon>
            </template>
            <v-list-item-title class="text-uppercase back-title">
              {{ link.title }}
            </v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item
          v-for="sublink in link.subLinks"
          :to="sublink.path"
          :key="sublink.title"
          exact
        >
          <template v-slot:prepend>
            <v-icon :icon="sublink.icon"></v-icon>
          </template>
          <v-list-item-title>
            {{ sublink.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>

    <template v-slot:append>
      <div class="pa-2 text-center">
        <v-btn
          block
          class="text-none primary"
          variant="outlined"
          prepend-icon="mdi-application-outline"
        >
          Version 0.0.1
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import { useAuthStore } from '../../stores/auth'
  import { mapState } from 'pinia'

  export default {
    data: () => ({
      open: ['Examination']
    }),
    computed: {
      ...mapState(useAuthStore, {
        userRole: state => state.userRole // Get userId from userStore
      }),

      adminMenu() {
        return [
          {
            path: '/dashboard',
            title: this.$t('mainMenu.dashboard'),
            icon: 'mdi-view-dashboard'
          },
          {
            title: this.$t('navigation.user'),
            icon: 'mdi-home',
            subLinks: [
              {
                path: '/students',
                title: this.$t('mainMenu.student'),
                icon: 'mdi-account-group'
              },
              {
                path: '/teachers',
                title: this.$t('mainMenu.teacher'),
                icon: 'mdi-human-male-board-poll'
              }
            ]
          },
          {
            path: '/classroom',
            title: this.$t('mainMenu.classroom'),
            icon: 'mdi-human-male-board'
          },
          {
            path: '/courses',
            title: this.$t('mainMenu.course'),
            icon: 'mdi-school'
          },
          {
            path: '/grades',
            title: this.$t('mainMenu.score'),
            icon: 'mdi-chart-line'
          },
          {
            path: '/attendance',
            title: this.$t('navigation.attendanceTracking'),
            icon: 'mdi-calendar-check'
          },
          // {
          //   path: '/exams',
          //   title: this.$t('mainMenu.exam'),
          //   icon: 'mdi-file-document'
          // },
          {
            title: this.$t('navigation.settings'),
            icon: 'mdi-cog',
            subLinks: [
              {
                path: '/settings',
                title: this.$t('mainMenu.trush'),
                icon: 'mdi-delete-empty-outline'
              },
              {
                path: '/user-log',
                title: this.$t('mainMenu.accessLog'),
                icon: 'mdi-clock-outline'
              }
            ]
          }
        ]
      },
      studentMenu() {
        return [
          {
            path: '/home',
            title: this.$t('mainMenu.dashboard'),
            icon: 'mdi-view-dashboard'
          },
          {
            path: '/score/view',
            title: this.$t('mainMenu.score'),
            icon: 'mdi-chart-bar'
          },
          {
            path: '/attendance-view',
            title: this.$t('mainMenu.attendance'),
            icon: 'mdi-calendar-multiple-check'
          }
        ]
      },
      menus() {
        switch (this.userRole) {
          case 1:
            return this.adminMenu
          case 2:
            return this.studentMenu
          default:
            return []
        }
      }
    },
    methods: {
      drawer() {
        return this.value
      }
    }
  }
</script>
<style>
  .v-list-group__items {
    margin-left: -35px;
  }
  .v-navigation-drawer__content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /* Hide scrollbar for Webkit browsers */
  .v-navigation-drawer__content::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  .v-navigation-drawer__content {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .v-list-item-title .back-title {
    font-size: 15px !important;
  }
</style>
