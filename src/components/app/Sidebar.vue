<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: "Home", url: "/", exact: true },
      { title: "History", url: "/history" },
      { title: "Planning", url: "/planning" },
      { title: "New Record", url: "/record" },
      { title: "Categories", url: "/categories" }
    ]
  })
}
</script>
