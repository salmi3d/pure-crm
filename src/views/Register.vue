<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">CRM</span>
      <div class="input-field">
        <input id="email" type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Email can't be blank</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Invalid email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Please enter a password</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Your password must be at least {{ $v.password.$params.minLength.min }} characters</small>
      </div>
      <div class="input-field">
        <input id="name" type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Please enter your name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>I accept the rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Create account
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Sign in!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('auth/register', formData)
        this.$router.push('/')
      } catch (error) {
        //
      }
    }
  }
}
</script>
