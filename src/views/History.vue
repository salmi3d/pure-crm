<template>
  <div>
    <div class="page-title">
      <h3>Record History</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="records.length === 0" class="center">
      There are no records yet.
      <router-link to="/record">Add new record</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('record/fetchAll')
    const records = await this.$store.dispatch('record/fetchAll')
    this.categories = await this.$store.dispatch('category/fetchAll')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome',
      }
    })
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>
