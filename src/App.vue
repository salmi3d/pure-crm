<template>
  <div id="app">
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>
  </div>
</template>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/app.scss";
</style>
