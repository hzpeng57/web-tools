import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router'
import './style/style.css'
import 'vuetify/styles'

const vuetify = createVuetify()

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
