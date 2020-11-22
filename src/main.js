import store from './store/index.js'
import router from './router.js'
import mitt from 'mitt'
import { createApp } from 'vue'
import globalMixin from '/~/plugins/vue-prototype.js'
import App from './App.vue'
import '/~/css/index.css'

store.init()
  .then(() => {
    const app = createApp(App)
    const emitter = mitt()

    app.config.globalProperties.emitter = emitter
    
    app.use(store.vuex)
    app.use(router)
    app.mixin(globalMixin)
    app.mount('#app')
  })