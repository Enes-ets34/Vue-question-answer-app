<template>
  <div class="px-2">
    <div class="col-sm-7 mx-auto my-5 shadow">
      <div class="card">
        <div class="card-header"><h4>Soru Sor</h4></div>
        <div class="card-body">
          <div class="card-body">
            <div class="form-group">
              <div class="mb-3">
                <label for="title" class="form-label">Kısa bir başlık </label>
                <input
                  v-model="userData.title"
                  id="title"
                  type="text"
                  placeholder="Fok balıkları neden yalnız?"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Sorunuz</label>
                <quill-editor v-model:value="userData.content" />
              </div>
              <div class="mb-3">
                <label for="question-category" class="form-label"
                  >Kategori</label
                >
                <select
                  v-model="userData.categoryId"
                  id="question-category"
                  class="form-select"
                >
                  <option
                    v-for="category in categories"
                    :value="category.id"
                    :key="category"
                  >
                    {{ category.title }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-grid gap-2">
            <button
              :disabled="validate"
              @click="saveUserData"
              class="btn btn-warning"
            >
              Soru Sor
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { appAxios } from "../utils/appAxios";
import Quill from "quill";
export default {
  data() {
    return {
      userData: {
        title: null,
        content: null,
        categoryId: null
      }
    };
  },

  created() {
    this.userData.categoryId = this.$route.query?.categoryId || null;
  },
  methods: {
    saveUserData() {
      appAxios
        .post("/questions", { created_at: new Date(), ...this.userData })
        .then(res => this.$router.push({ name: "Home" }))
        .catch(err => console.error(err));
    }
  },

  computed: {
    validate() {
      return (
        !this.userData?.title?.length > 0 || !this.userData?.content?.length > 0
      );
    },
    ...mapGetters({
      categories: "categories/getCategories"
    })
  }
};
</script>

<style></style>
