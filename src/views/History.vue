<template>
  <div>
    <div class="page-title">
      <h3>Record History</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
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
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('record/fetchAll')
    const categories = await this.$store.dispatch('category/fetchAll')

    this.setup(categories)
    this.loading = false
  },
  components: {
    HistoryTable
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        }
      }))

      this.renderChart({
          labels: categories.map(i => i.title),
          datasets: [{
              label: 'Costs by categories',
              data: categories.map(i => {
                return this.records.reduce((total, r) => {
                  if(r.categoryId === i.id && r.type === 'outcome') {
                    total += + r.amount
                  }
                  return total
                }, 0)
              }),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      })
    }
  }
}
</script>
