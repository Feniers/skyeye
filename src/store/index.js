import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import user from './modules/user'
import api from './modules/api'

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
