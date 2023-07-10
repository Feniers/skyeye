import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import user from './modules/user'
import api from './modules/api'
// import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    // app,
    // settings,
    api,
    // article
  },
  getters,
  strict: true
})

export default store
