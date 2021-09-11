<template>
  <router-view name="Header"></router-view>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("categories/fetchCategories");
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
