import Vue from 'vue'
import Vuex from 'vuex'
import VueMixinStore from 'vue-mixin-store'
import * as api from './api'

const flow = VueMixinStore.FlowStore(api, true)

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flow
  }
})
