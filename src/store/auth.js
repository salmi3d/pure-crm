import firebase from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async login({ dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        dispatch('setError', error)
        throw error
      }
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const userId = await dispatch('getUserId')
        await firebase.database().ref(`/users/${userId}/info`).set({
          bill: 10000,
          name
        })
      } catch (error) {
        dispatch('setError', error)
        throw error
      }
    },
    async logout() {
      await firebase.auth().signOut()
    },
    getUserId() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
