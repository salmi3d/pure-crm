import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    info: {}
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info
    },
    CLEAR_INFO(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
        commit('SET_INFO', info)
      } catch (error) {
        //
      }
    },
    clearInfo({ commit }) {
      commit('CLEAR_INFO')
    }
  },
  getters: {
    info: state => state.info
  }
}
