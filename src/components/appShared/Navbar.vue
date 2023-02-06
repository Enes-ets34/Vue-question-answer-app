<template>
  <nav class="mb-3 fixed-top navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container">
      <router-link tag="a" to="/" class="navbar-brand" href="#">Soru-Cevap</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item mx-2">
            <router-link active-class="active" tag="a" to="/" class="nav-link" aria-current="page"
              href="#">Anasayfa</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link tag="button" to="/new-question" class="btn btn-outline-dark" active-class="active">
              <i class="fa-solid fa-question me-2"></i>Soru Sor
            </router-link>
          </li>
        </ul>
        <div class="d-flex me-auto" role="search">
          <input class="form-control me-2" type="text" placeholder="Search"
            @keypress.enter="search($event.target.value)" />
        </div>

        <div v-if="currentUser">
          <div class="btn-group">
            <button type="button" class="btn btn-success text-light dropdown-toggle" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{ currentUser.full_name }}
            </button>

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start mt-2">
              <li class="align-items-center">
                <a href="#" class="dropdown-item"><i class="fas fa-question me-2"></i>Sorularım</a>
              </li>
              <li class="align-items-center">
                <a href="#" class="dropdown-item disabled"><i class="fas fa-star me-1"></i>Favorilerim</a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li class="align-items-center">
                <a href="#" class="dropdown-item"><i class="fas fa-user me-1"></i>Hesabım</a>
              </li>
              <li @click="logout" class="align-items-center">
                <a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt me-1"></i>Çıkış yap</a>
              </li>
            </ul>
          </div>
        </div>
        <router-link v-else to="/login" type="button" class="btn btn-dark">Giriş Yap</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    search(e) {
      console.log('e :>> ', e);
      this.$store.dispatch("questions/fetchQuestions", { searchKey: e })
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout")
    }
  }
};
</script>

<style>

</style>
