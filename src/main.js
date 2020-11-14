import store from './store/index.js'
import router from './router.js'
import { createApp } from 'vue'
import globalMixin from '/~/plugins/vue-prototype.js'
import App from './App.vue'
import '/~/css/index.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mixin(globalMixin)
app.mount('#app')