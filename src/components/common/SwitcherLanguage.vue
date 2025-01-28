<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" stacked>
        <v-avatar color="brown" size="small">
          <v-img :src="currentLanguageImage" :width="30"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-list nav density="compact" class="rounded-lg">
      <v-list-item
        v-for="list in languages"
        :key="list.lang"
        @click="switchLanguage(list.lang)"
        color="primary"
        value="list"
      >
        <template v-slot:append>
          <v-avatar size="small">
            <v-img :src="list.imgSrc" :alt="list.alt" cover />
          </v-avatar>
        </template>
        <v-list-item-title v-text="list.label"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    methods: {
      switchLanguage(lang) {
        this.$i18n.locale = lang
        localStorage.setItem('lang', lang)
        this.$vuetify.locale.current = lang // sync with Vuetify locale
      }
    },
    computed: {
      currentLanguageImage() {
        return this.$i18n.locale === 'en'
          ? '/assets/images/en.png'
          : '/assets/images/kh.png'
      },
      languages() {
        return [
          {
            lang: 'km',
            imgSrc: '/assets/images/kh.png',
            alt: 'Khmer Flag',
            label: this.$t('lang.km')
          },
          {
            lang: 'en',
            imgSrc: '/assets/images/en.png',
            alt: 'English Flag',
            label: this.$t('lang.en')
          }
        ]
      }
    },
    created() {
      const lang = localStorage.getItem('lang')
      if (lang) {
        this.$i18n.locale = lang
        this.$vuetify.locale.current = lang /// vuetify
      }
    }
  }
</script>
