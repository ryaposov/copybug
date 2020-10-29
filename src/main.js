import router from './router.js'
import { createApp } from 'vue'
import globalMixin from '/~/plugins/vue-prototype.js'
import App from './App.vue'
import '/~/css/index.css'

const app = createApp(App)
app.mixin(globalMixin)
app.use(router)
app.mount('#app')