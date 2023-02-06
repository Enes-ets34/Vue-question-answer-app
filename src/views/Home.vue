<template>
  <appNavbar />
  <div class="row">

    <Categories @select-category="selectedCategories" />


    <QuestionList :questionList="questionList" />
  </div>
</template>
<script>

import Categories from "../components/Categories.vue";
import QuestionList from "../components/Question/QuestionList.vue";
import { mapGetters } from "vuex";


export default {
  components: { Categories, QuestionList },
  created() {
    this.$store.dispatch("questions/fetchQuestions", this.$store.getters["categories/getSelectedCategories"]);
  },

  computed: {
    ...mapGetters({
      questionList: "questions/getQuestions",
    }),
  },
  methods: {
    selectedCategories(e) {
      this.$store.dispatch("questions/fetchQuestions", { categories: e });
    },

  },
};
</script>
