<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div
        class="row"
        v-else
      >
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length > 0"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategory"
        />
        <p
          v-else
          class="center"
        >There are no categories yet</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('category/fetchAll')
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
