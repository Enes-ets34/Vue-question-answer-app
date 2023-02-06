<template>
  <appNavbar />
  <div class="row">
    <div class="col-md-7 mt-3 mx-auto">
      <div class="card">
        <div class="card-header">

          <h4>Soru Sor</h4>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="question-title" class="form-label">Kısa bir başlık...</label>
            <input v-model="userData.title" type="text" class="form-control" id="question-title"
              placeholder="Fok balıkları neden yalnız?" />
          </div>
          <div class="mb-3">
            <label for="textarea" class="form-label">Sorunuz</label>
            <QuillEditor toolbar="full" v-model:content="userData.details" contentType="html" theme="snow"
              placeholder="Sorunuzu buraya yazınız..."></QuillEditor>

          </div>
          <div class="mb-3">
            <label for="categories" class="form-label">Kategori</label>
            <select v-model="userData.categoryId" id="categories" class="form-select">
              <option v-for="category in categories" :key="category" :value="category.id">
                {{ category.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-grid gap-2">
            <button :disabled="invalid" @click="askQuestion" class="btn btn-success">
              Yayınla
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      userData: {
        title: null,
        details: null,
        categoryId: null,
      },
    };
  },
  components: {
  
  },
  created() {
    this.userData.categoryId = this.$route.query.categoryId || null

  },
  methods: {
    askQuestion() {
 
      this.$store.dispatch("questions/saveQuestion", this.userData);
    },
  },
  computed: {
    invalid() {
      return (
        this.userData?.title === null ||
        this.userData?.title?.trim() === "" ||
        this.userData?.details === null ||
        this.userData?.details?.trim() === "" ||
        this.userData?.categoryId === null ||
        this.userData?.categoryId === ""
      );
    },
    ...mapGetters({
      categories: "categories/getCategories",
    }),
  },
};
</script>

<style>

</style>
