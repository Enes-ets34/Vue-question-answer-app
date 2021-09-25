<template>
  <div class="card sticky-top mb-2 shadow" style="z-index:0 !important;">
    <div class="list-group">
      <a
        href="#"
        class="list-group-item list-group-item-action bg-warning text-center"
        aria-current="true"
      >
        Kategoriler
      </a>
      <!-- <a
        v-for="(category, index) in categories"
        :key="category.id"
        href="#"
        class="list-group-item list-group-item-action "
        @click.prevent="addToSelectedCategories(category)"
        :class="{ 'bg-warning': Boolean(selectedCategories.find(c=>c.id===category.id)) }"
      >
        <i class="fa fa-hashtag" :class="{ [textColor(index)]: true }"></i> {{ category.title }}
      </a> -->
      <a
        v-for="(category, index) in categories"
        :key="category.id"
        href="#"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        @click.prevent="category.selected = !category.selected"
        :class="{ active: category.selected }"
      >
        <div>
          <i class="fa fa-hashtag me-2" :class="{ [textColor(index)]: true }">
          </i>
          {{ category.title }} - {{ categoryCount }}
        </div>

        <i v-if="category.selected" class=" fas fa-check"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // ...mapState(["categories/categories"]),
      colors: [
        "text-primary",
        "text-danger",
        "text-dark",
        "text-secondary",
        "text-success",
        "text-info",
        "text-warning",
        "text-muted"
      ]
    };
  },
  created() {},
  methods: {
    textColor(index) {
      return this.colors[index % this.colors.length];
    },
    addToSelectedCategories(category) {
      this.$store.commit("categories/addToSelectedCategories", category);
    }
  },

  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
      selectedCategories: "categories/getSelectedCategories",
      questions: "questions/getQuestions"
    }),
    categoryCount() {}
  },
  watch: {
    categories: {
      deep: true,
      handler(categories) {
        this.$store.dispatch("questions/fetchQuestions", {
          selectedCategories: categories
        });
      }
    }
  }
};
</script>

<style scoped>
.active {
  background-color: #ffec98;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
