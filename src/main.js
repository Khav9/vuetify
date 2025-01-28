import { createApp } from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import i18n from "./plugins/i18n"
import "./style.css"

import BreadCrumb from './components/global/BreadCrumb.vue'
import CustomTitle from "./components/global/CustomTitle.vue";
import { formatCustomDate } from './utils/dateFormatter'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
app.use(router)
app.use(i18n)
app.component('bread-crumb', BreadCrumb)
app.component("CustomTitle", CustomTitle);
app.config.globalProperties.$formatCustomDate = formatCustomDate

app.mount("#app")