<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning mb-5 sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Soru-Cevap</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              active-class="active"
              class="nav-link"
              aria-current="page"
              href="#"
              >Anasayfa</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/new"
              class="btn btn-outline-dark"
              active-class="active"
              href="#"
              ><i class="fas fa-question me-2"></i>Soru Sor</router-link
            >
          </li>
        </ul>
        <div class="form-group me-auto">
          <input
            v-model="key"
            @keydown.enter="search()"
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <!-- User dropdown -->
        <user-list-item
          v-if="isAuth"
          :currentUser="currentUser"
        ></user-list-item>
        <router-link to="/login" v-else class="btn btn-dark"
          >Giriş Yap</router-link
        >
        <!-- /User dropdown -->
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

import UserListItem from "./UserListItem.vue";

export default {
  components: { UserListItem },
  data() {
    return {
      key: "",

    };
  },
  methods: {
    search() {
      this.$store.dispatch("questions/fetchQuestions", { searchKey: this.key });
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser",
      isAuth: "users/isAuth"
    })
  }
};
</script>

<style></style>
