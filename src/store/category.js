import firebse from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async create({ dispatch }, { title, limit }) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        const category = await firebse.database().ref(`/users/${userId}/categories`).push({
          title,
          limit
        })

        return { title, limit, id: category.key }
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    }
  }
}
