import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {

  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info
    },
  },
  actions: {
    async create({ dispatch }, record) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        return await firebase.database().ref(`/users/${userId}/records`).push(record)
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
