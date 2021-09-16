<template>
  <div class="dropdown me-3">
    <div class="btn-group">
      <button
        type="button"
        class="btn btn-warning dropdown-toggle"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <i class="fas fa-user-alt"></i> {{ currentUser.name }}
      </button>
      <ul
        class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start mt-2"
        style="z-index:1 !important;"
      >
        <li class="align-items-center">
          <router-link to="/my-questions" class="dropdown-item" href="#"
            ><i class="fas fa-question me-2"></i>Sorularım</router-link
          >
        </li>
        <li class="align-items-center">
          <router-link to="favorites" class="dropdown-item" href="#"
            ><i class="fas fa-star me-1"></i>Favorilerim</router-link
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li class="align-items-center">
          <router-link to="profile" class="dropdown-item" href="#">
            <i class="fas fa-user me-1"></i>Hesabım</router-link
          >
        </li>
        <li class="align-items-center">
          <a @click="logout" class="dropdown-item" href="#"
            ><i class="fas fa-sign-out-alt me-1"></i>Çıkış yap</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout");
    }
  }
};
</script>

<style></style>
