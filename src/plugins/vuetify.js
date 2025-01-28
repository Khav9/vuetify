import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { km, en } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'
import { VDateInput } from 'vuetify/labs/VDateInput'

const vuetify = createVuetify({
  components: {
    VDateInput,
    ...components,
    ...labs
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#89474b',
          secondary: "#c17290", 
          textField: "#2f9dab", 
          icon: "#653748", 
          btnEdit: "#a0627f", 
          background: "#f8f7f8", 
          warning: '#FB8C00',
          error: '#B00020',
        }
      },
    },
  },
  locale: {
    messages: { en, km },
    locale: 'en',
    fallback: 'km'
  },
  icons: {
    iconfont: 'mdi'
  },
  date: {
    locale: {
      en: 'en-GB'
    }
  }
})

export default vuetify
