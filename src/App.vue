<template>
  <router-view name="Header"></router-view>

  <router-view></router-view>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("categories/fetchCategories");
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    })
  }
};
</script>
<style></style>
