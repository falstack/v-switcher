import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Switcher from '../src/v-switcher'
import './iconfont.css'

Vue.config.productionTip = false
Vue.component(Switcher.name, Switcher)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
