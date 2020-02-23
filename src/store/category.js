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
    },
    async update({ dispatch }, { id, title, limit }) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        await firebse.database().ref(`/users/${userId}/categories`).child(id).update({
          title,
          limit
        })
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    },
    async fetchAll({ dispatch }) {
      try {
        const userId = await dispatch('auth/getUserId', null, { root: true })
        const categories = (await firebse.database().ref(`/users/${userId}/categories`).once('value')).val() || {}

        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }))
      } catch (error) {
        dispatch('setError', error, { root: true })
        throw error
      }
    }
  }
}
