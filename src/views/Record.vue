<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="categories.length === 0" class="center">There are no categories yet. <router-link to="/categories">Add new category</router-link></p>

    <form class="form" v-else @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{ category.title }}</option>
        </select>
        <label>Choose a category</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income"
            v-model="type"
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome"
            v-model="type"
          />
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Amount</label>
        <span class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Minimum value {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input id="description" type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Description</label>
        <span class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Please enter a description</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import * as M from 'materialize-css'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    category: null,
    select: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('category/fetchAll')
    this.loading = false
    if(this.categories.length > 0) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters('info', {
      userInfo: 'info',
    }),
    canCreateRecord() {
      if(this.type === 'income') {
        return true
      }
      return this.userInfo.bill >= this.amount
    }
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if(!this.canCreateRecord) {
        this.$message(`Insufficient funds in the account (${this.amount - this.userInfo.bill})`)
      }


      try {
        await this.$store.dispatch('record/create', {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        })
        const bill = this.type === 'income'
          ? this.userInfo.bill + this.amount
          : this.userInfo.bill - this.amount
        await this.$store.dispatch('info/update', { bill })
        this.$message('Record created successfully')
        this.$v.$reset()
        this.amount = 1
        this.description = ''
      } catch (error) {
        //
      }
    }
  }
}
</script>
