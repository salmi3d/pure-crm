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
    async fetch({ dispatch, commit }) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
        commit('SET_INFO', info)
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    },
    async update({ dispatch, commit, getters }, toUpdate) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        const updateData = {
          ...getters.info,
          ...toUpdate
        }
        await firebase.database().ref(`/users/${userId}/info`).update(updateData)
        commit('SET_INFO', updateData)
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    },
    clear({ commit }) {
      commit('CLEAR_INFO')
    }
  },
  getters: {
    info: state => state.info
  }
}
