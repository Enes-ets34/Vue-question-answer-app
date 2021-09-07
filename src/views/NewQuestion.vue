<template>
  <div class="col-sm-7 mx-auto mt-5">
    <div class="card">
      <div class="card-header"><h4>Soru Sor</h4></div>
      <div class="card-body">
        <div class="card-body">
          <div class="form-group">
            <div class="mb-3">
              <label for="title" class="form-label">Adınız ve Soyadınız</label>
              <input v-model="userData.title" id="title" type="text" placeholder="Fok balıkları neden yalnız?" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Sorunuz</label>
              <textarea v-model="userData.content" class="form-control" id="content" placeholder="Sorunuzu açıklayınız..." rows="5"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Kategori</label>
              <select v-model="userData.categoryId" class="form-select" aria-label="Default select example">
                <option selected value="null">Kategori Seçiniz...</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-grid gap-2">
          <button :disabled="validate" @click="saveUserData" class="btn btn-warning">Soru Sor</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appAxios } from "../utils/appAxios";

export default {
  data() {
    return {
      categories: [],
      userData: {
        title: null,
        content: null,
        categoryId: null
      }
    };
  },
  methods: {
    saveUserData() {
      appAxios
        .post("/questions", { created_at: new Date(), ...this.userData })
        .then(res => {
          console.log(res);
          this.$router.push({ name: "Home" });
        })
        .catch(err => console.error(err));
    }
  },
  created() {
    appAxios
      .get("/categories")
      .then(res => (this.categories = res.data))
      .catch(err => console.error(err));
  },
  computed: {
    validate() {
      return !this.userData?.title?.length > 0 || !this.userData?.content?.length > 0;
    }
  }
};
</script>

<style></style>
