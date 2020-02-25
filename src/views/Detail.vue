<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="!!record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a class="breadcrumb" @click.prevent>
          {{ record.typeText  }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="record.typeClass"
          >
            <div class="card-content white-text">
              <p>Description: {{ record.description }}</p>
              <p>Amount: {{ record.amount | currency }}</p>
              <p>Category: {{ record.categoryName }}</p>
              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      Record with id=<strong>{{ $route.params.id }}</strong> does not exists.
    </p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('record/fetchById', id)
    const category = await this.$store.dispatch('category/fetchById', record.categoryId)

    this.record = {
      ...record,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Income' : 'Outcome',
      categoryName: category.title
    }
    this.loading = false
  }
}
</script>
