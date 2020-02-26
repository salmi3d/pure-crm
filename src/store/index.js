import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

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
    },
    async fetchCurrency({ dispatch }) {
      try {
        const response = await (await fetch(`https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD,RUB`)).json()
        response.rates.EUR = 1
        return response
      } catch (error) {
        dispatch('setError')
        throw error
      }
    }
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
