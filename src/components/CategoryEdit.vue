<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{ category.title }}</option>
          </select>
          <label>Choose a category</label>
        </div>

        <div class="input-field">
          <input type="text" id="name-edit"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name-edit">Title</label>
          <span class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Please enter a category</span>
        </div>

        <div class="input-field">
          <input id="limit-edit" type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit-edit">Limit</label>
          <span class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Minimum value {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Done
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import * as M from 'materialize-css'

export default {
  name: 'category-edit',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  watch: {
    current(id) {
      const { title, limit } = this.categories.find(c => c.id === id)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('category/update', categoryData)
        this.$message('Сategory updated successfully')
        this.$emit('updated', categoryData)
      } catch (error) {
        //
      }
    }
  }
}
</script>
