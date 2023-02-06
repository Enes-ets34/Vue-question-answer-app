<template>



  <div class="col-md-3 mb-2">

    <div class="card card sticky-top">
      <div class="card-header bg-success text-light text-center">
        Kategoriler
      </div>

      <ul class="list-group list-group-flush">
        <button v-for="(category, index) in categories" :key="category.id"
          class="list-group-item list-group-item-action" :class="{ active: category.isSelect }"
          @click="selectCategory(category)">
          <i :class="{ [color(index)]: true }" class="fa-regular fa-hashtag me-2"></i>{{ category.title }}
        </button>
      </ul>

    </div>

  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      colorClasses: [
        "text-danger",
        "text-primary",
        "text-success",
        "text-warning",
        "text-dark",
        "text-info",
      ],
    };
  },

  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
    }),

  },
  methods: {
    color(index) {
      return this.colorClasses[index % this.colorClasses.length];
    },
    selectCategory(category) {
      category.isSelect = !category.isSelect;
      // this.$emit("select-category", category);
      this.$emit("select-category", this.categories);
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #b9efd6 !important;
  border: #76ba9b solid;
  color: rgb(35, 33, 33);
}
</style>
