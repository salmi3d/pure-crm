import firebase from 'firebase/app'
export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      console.log(dispatch, commit)
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(response)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}
