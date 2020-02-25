<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">{{ 'Name' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{ 'Message_EnterName' | localize }}</small>
      </div>

      <div class="switch">
        <label>
          Russian
          <input
            type="checkbox"
            v-model="isEngLocale"
          />
          <span class="lever"></span>
          English
        </label>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
      >
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import * as M from 'materialize-css'

export default {
  name: 'profile',
  data: () => ({
    name: '',
    isEngLocale: true
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.userInfo.name
    this.isEngLocale = this.userInfo.locale === 'en-US'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters('info', {
      userInfo: 'info',
    })
  },
  methods: {
    ...mapActions('info', {
      updateInfo: 'update'
    }),
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }


      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEngLocale ? 'en-US' : 'ru-RU'
        })
      } catch (error) {
        //
      }
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
