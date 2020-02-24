<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />>

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record"
          v-tooltip="'Create new record'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar"
import Sidebar from "@/components/app/Sidebar"
export default {
  name: 'main-layout',
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(fbError.message || 'Something went wrong')
    }
  },
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (Object.entries(this.$store.getters['info/info']).length === 0) {
      await this.$store.dispatch('info/fetch')
    }

    this.loading = false
  }
}
</script>
