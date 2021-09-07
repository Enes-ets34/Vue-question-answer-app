<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
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
            <router-link to="/" active-class="active" class="nav-link" aria-current="page" href="#">Anasayfa</router-link>
          </li>
          <li v-if="isAuth" class="nav-item">
            <router-link to="/new" class="btn btn-outline-dark" active-class="active" href="#"><i class="fas fa-question me-2"></i>Soru Sor</router-link>
          </li>
        </ul>
        <div class="form-group me-auto">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
        </div>
        <!-- User dropdown -->
        <user-list-item v-if="isAuth"></user-list-item>
        <button v-else class="btn btn-dark">Giriş Yap</button>
        <!-- /User dropdown -->
      </div>
    </div>
  </nav>
</template>

<script>
import UserListItem from "./UserListItem.vue";
export default {
  components: { UserListItem },
  data() {
    return {
      isAuth: true
    };
  },
  computed: {}
};
</script>

<style></style>
