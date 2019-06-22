import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Switcher from '../src/v-switcher'
import './iconfont.css'
import VueMixinStore from 'vue-mixin-store'

Vue.config.productionTip = false
Vue.component(Switcher.name, Switcher)
Vue.component(VueMixinStore.FlowLoader.name, VueMixinStore.FlowLoader)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
