import firebase from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async create({ dispatch }, record) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        return await firebase.database().ref(`/users/${userId}/records`).push(record)
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    },
    async fetchAll({ dispatch }) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        const records = (await firebase.database().ref(`/users/${userId}/records`).once('value')).val() || {}

        return Object.keys(records).map(key => ({
          ...records[key],
          id: key
        }))
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    },
    async fetchById({ dispatch }, id) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        const record = (await firebase.database().ref(`/users/${userId}/records`).child(id).once('value')).val() || {}

        return {
          ...record,
          id
        }
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    }
  },
}
