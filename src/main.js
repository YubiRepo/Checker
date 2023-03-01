import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import store from './store'
import router from './router'

import vuetify from './plugins/vuetify';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(store)

app.mount('#app')