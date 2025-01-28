<template>
  <v-app>
    <Notif ref="notif" dismissible :default-timeout="2000" />
    <Confirm ref="confirm" />
    <router-view />
    <Loading />
  </v-app>
</template>
<!-- <script setup>
  import { ref } from 'vue'

  const theme = ref('light')

  function onClick() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script> -->
<script>
    import Notif from '@/components/global/Notification.vue'
    import Confirm from '@/components/global/Confirm.vue'
    import Loading from '@/components/global/Loading.vue'
  // import { mapActions, mapState } from 'pinia'
    export default {
      name: 'App',
      components: {
        Notif,
        Confirm,
        Loading
      },
      // created(){
      //   this.setTheme()
      // },
      methods: {
        // ...mapActions(useThemeStore,['setTheme']),
        handleKeyDown(e) {
          if (e.shiftKey && e.ctrlKey && e.key === 'L') {
            e.preventDefault() // Prevent any default behavior
            this.$i18n.locale = this.$i18n.locale === 'en' ? 'km' : 'en'
            localStorage.setItem('lang', this.$i18n.locale)
          }
        }
      },
      // computed:{
      //   ...mapState(useThemeStore,['theme'])
      // },
      mounted() {
        this.$root.$confirm = this.$refs.confirm.open
        this.$root.$notif = this.$refs.notif.newAlert

        const savedLang = localStorage.getItem('lang')
        if (savedLang) {
          this.$i18n.locale = savedLang
        }
        document.addEventListener('keydown', this.handleKeyDown)
      },
      beforeDestroy() {
        // Clean up the event listener when the component is destroyed
        document.removeEventListener('keydown', this.handleKeyDown)
      }
    }
</script>

<style>
  html {
    overflow-y: auto;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  thead tr th {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>
