<template>
  <router-view name="Header"></router-view>

  <router-view></router-view>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("categories/fetchCategories");

  }
};
</script>
<style></style>
