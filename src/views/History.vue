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
      <HistoryTable :records="items" />

      <Paginate class="center"
        v-model="page"
        :page-count="pageCount"
        :click-handler="onChangePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('record/fetchAll')
    const categories = await this.$store.dispatch('category/fetchAll')

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome',
      }
    }))
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>
