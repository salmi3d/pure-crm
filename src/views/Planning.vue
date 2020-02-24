<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{ userInfo.bill | currency('RUB') }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="categories.length === 0" class="center">There are no categories yet. <router-link to="/categories">Add new category</router-link></p>

    <section v-else>
      <div
        v-for="category in categories"
        :key="category.id"
      >
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency }} of {{ category.limit | currency }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters('info', {
      userInfo: 'info',
    }),
  },
  async mounted() {
    const records = await this.$store.dispatch('record/fetchAll')
    const categories = await this.$store.dispatch('category/fetchAll')
    this.categories = categories.map(category => {
      const spend = records
        .filter(r => r.categoryId === category.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, r) => total += +r.amount, 0)

      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      const tooltipValue = category.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Overdraft' : 'Remain'}: ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  }
}
</script>
