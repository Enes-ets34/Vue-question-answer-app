<template>
  <div class="row">
    <div class="col-md-5 mx-auto">
      <div class="card">
        <div class="card-header text-center">
          <h4>Giriş Yap</h4>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">E-posta Adresi</label>
            <input v-model="userData.email" type="email" class="form-control" id="exampleInputEmail1" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Şifre</label>
            <input v-model="userData.password" type="password" class="form-control" id="exampleInputPassword1" />
          </div>


          <div class="d-grid gap-2">
            <button @click="login" type="submit" class="btn btn-success">Giriş Yap!</button>
          </div>

        </div>
        <div class="card-footer text-center">
          <router-link to="/register" class="text-primary">Henüz üye değil misin? Tıklayarak üye ol!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {}
    }
  },
  methods: {
    login() {

      this.$store.dispatch("users/login", { ...this.userData })
    }
  }
};
</script>

<style>

</style>
