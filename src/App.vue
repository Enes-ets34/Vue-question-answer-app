<template>

  <div class="container" style="margin-top: 5rem !important">


    <router-view />

  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Navbar from "./components/appShared/Navbar.vue";

export default {
  components: { Navbar },
  created() {
    this.$store.dispatch("categories/fetchCategories");
    //  this.$store.dispatch("questions/fetchQuestions");
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    })
  }
};
</script>
<style>
body {
  background-color: rgba(47, 134, 93, 0.25);
}

.card {
  box-shadow: 6px 5px 4px 0px rgba(0, 0, 0, 0.1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.5s ease;
}
</style>
