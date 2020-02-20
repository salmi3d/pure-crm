<template>
  <nav class="navbar green lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <strong class="black-text">{{ date | date("datetime") }}</strong>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            USER_NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Profile
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import * as M from 'materialize-css'
export default {
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown)
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login?message=logout')
    }
  }
}
</script>
