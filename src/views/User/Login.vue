<template class="login">
  <div class="col-md-4 mt-5 mx-auto">
    <div class="card shadow">
      <div class="card-header text-center">
        <h4 v-if="account">Kayıt Ol</h4>
        <h4 v-else>Giriş Yap</h4>
      </div>
      <!-- REGISTER -->
      <div class="card-body" v-if="account">
        <div class="form-group">
          <div class="mb-3">
            <label class="form-label"><small>Adınız ve Soyadınız</small></label>
            <input
              v-model="userData.name"
              type="text"
              placeholder="Ad Soyad..."
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label"><small>E-Posta Adresiniz</small></label>
            <input
              v-model="userData.email"
              type="mail"
              placeholder="ornek@example.com..."
              class="form-control"
            />
            <small v-if="checkMail" class="text-danger"
              >Bu alan zorunludur.</small
            >
          </div>
          <div class="mb-3">
            <label class="form-label"><small>Şifreniz</small></label>
            <input
              v-model="userData.password"
              type="password"
              placeholder="******"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label"><small>Şifre Tekrarı</small></label>
            <input
              v-model="repeatPass"
              type="password"
              placeholder="******"
              class="form-control"
            />
            <small v-if="!checkPassword" class="text-danger"
              >Şifreler eşleşmiyor !</small
            >
          </div>
          <div class="mb-3">
            <label class="form-label"
              ><small>İlgi Duyduğunuz Kategori</small></label
            >
            <select
              v-model="userData.categoryId"
              class="form-select"
              aria-label="Default select example"
            >
              <option disabled selected>Kategori Seçiniz...</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category.id"
                >{{ category.title }}</option
              >
            </select>
          </div>

          <div class="d-grid gap-2">
            <button
              :disabled="validate"
              @click="register({ ...userData })"
              class="btn btn-warning"
            >
              Kayıt Ol !
            </button>
          </div>
        </div>
      </div>
      <!-- /REGISTER -->

      <!-- LOGIN -->
      <div class="card-body" v-else>
        <div class="form-group">
          <div class="mb-3">
            <label class="form-label"><small>E-Posta Adresi</small></label>
            <input
              v-model="userData.email"
              type="mail"
              placeholder="ornek@example.com..."
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label"><small>Şifre</small></label>
            <input
              v-model="userData.password"
              type="password"
              placeholder="******"
              class="form-control"
            />
          </div>
          <div class="d-grid gap-2">
            <button @click="login({ ...userData })" class="btn btn-warning">
              Giriş Yap !
            </button>
          </div>
        </div>
      </div>
      <!-- /LOGIN -->
      <div class="card-footer">
        <small v-if="account"
          ><a @click="account = false" href="#" class="text-primary"
            >Zaten Üyeyim</a
          ></small
        >
        <small v-else
          ><a @click="account = true" href="#" class="text-primary"
            >Henüz üye değil misin? Tıklayarak üye ol!</a
          ></small
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      account: false,
      userData: {
        name: null,
        email: null,
        password: null,
        categoryId: null,
        bio: null
      },
      repeatPass: null
    };
  },

  methods: {
    ...mapActions({
      register: "users/register",
      login: "users/login"
    })
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories"
    }),
    validate() {
      return (
        !this.checkPassword ||
        this.userData.email === null ||
        this.userData.password === null ||
        this.userData.email.trim() === "" ||
        this.userData.password.trim() === ""
      );
    },
    checkPassword() {
      return this.repeatPass === this.userData.password;
    },
    checkMail() {
      if (this.userData.email !== null) {
        return (
          this.userData.email === null || this.userData.email.trim() === ""
        );
      }
    },
    userPassword(){
      
    }
  }
};
</script>

<style></style>
