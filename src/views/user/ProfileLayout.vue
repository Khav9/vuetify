<template>
  <v-container class="pa-0">
    <custom-title icon="mdi-card-account-details">
      <strong>{{$t('common.myProfileInformation')}}</strong>
    </custom-title>
    <v-row class="mt-4">
      <v-toolbar elevation="2" rounded="lg">
        <v-col cols="12" class="text-center">
          <v-btn
            variant="text"
            v-for="item in sidebarItems"
            :key="item"
            :to="item.path"
            width="190"
          >
            {{ item.title }}
          </v-btn>
        </v-col>
      </v-toolbar>
      <v-main class="pa-0">
        <v-container class="pa-0" fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'UserProfile',
    data() {
      return {
        sidebarItems: [
          { title: 'Summary', icon: 'mdi-cash', path: 'my-summary' },
          { title: 'Posts', icon: 'mdi-cart', path: 'my-post' },
          { title: 'Follower', icon: 'mdi-cart', path: 'my-follower' },
          { title: 'Following', icon: 'mdi-cart', path: 'my-following' },
          { title: 'My Save', icon: 'mdi-cart', path: 'my-save' },
          { title: 'My Profile', icon: 'mdi-account', path: 'profile' },
        ]
      }
    },
    methods: {}
  }
</script>
