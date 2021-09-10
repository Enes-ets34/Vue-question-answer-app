<template>
  <div class="card sticky-top mb-2" style="z-index:0 !important;">
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action bg-warning text-center" aria-current="true">
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
        class="list-group-item list-group-item-action "
        @click.prevent="category.selected = !category.selected"
        :class="{ 'bg-warning': category.selected }"
      >
        <i class="fa fa-hashtag" :class="{ [textColor(index)]: true }"></i> {{ category.title }}
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
      colors: ["text-primary", "text-danger", "text-dark", "text-secondary", "text-success", "text-info", "text-warning", "text-muted"]
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
      selectedCategories: "categories/getSelectedCategories"
    })
  },
  watch:{
    categories:{
      deep:true,
      handler(categories){
        this.$store.dispatch("questions/fetchQuestions",categories)
      }
    }
  }
};
</script>

<style scoped>
.active {
  background-color: #f0f0f0;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
