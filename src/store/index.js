import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  actions: {
    setError({ commit }, error) {
      commit('SET_ERROR', error)
    }
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth
  }
})
