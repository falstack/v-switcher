import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLayoutTab from '../src/VueLayoutTab'

Vue.config.productionTip = false
Vue.component(VueLayoutTab.name, VueLayoutTab)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
