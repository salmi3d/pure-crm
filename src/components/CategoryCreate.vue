<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input id="name-create" type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name-create">Title</label>
          <span class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Please enter a category</span>
        </div>

        <div class="input-field">
          <input id="limit-create" type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit-create">Limit</label>
          <span class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Minimum value {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import * as M from 'materialize-css'

export default {
  name: 'category-create',
  data: () => ({
    title: '',
    limit: 100
  }),
  mounted() {
    M.updateTextFields()
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        title: this.title,
        limit: this.limit
      }

      try {
        const category = await this.$store.dispatch('category/create', formData)
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message(`Category ${category.title} was created`)
        this.$emit('created', category)
      } catch (error) {
        //
      }
    }
  }
}
</script>
