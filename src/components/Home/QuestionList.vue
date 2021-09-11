<template>
  <div v-if="questionList.length === 0" class="alert alert-warning">
    <p class="display-6 text-center text-dark">
      Bu kategori(lere) ait soru bulunamadı :(. İlk soruyu sormak için
      <router-link :to="newQuestionUrl">buraya tıkla</router-link>
    </p>
  </div>

  <Question
    v-else
    v-for="question in questionList"
    :key="question.id"
    :question="question"
  />
</template>

<script>
import { mapGetters } from "vuex";

import Question from "../../components/Question.vue";

export default {
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    Question
  },
  created() {
    this.$store.dispatch("questions/fetchQuestions", this.selectedCategories);
  },
  computed: {
    ...mapGetters({
      questionList: "questions/getQuestions",
      selectedCategories: "categories/getSelectedCategories"
    }),
    selectedCategory() {
      if (this.selectedCategories.length === 1) {
        return this.selectedCategories[0]?.id;
      } else {
        return false;
      }
    },
    newQuestionUrl() {
      return this.selectedCategory
        ? `/new?categoryId=${this.selectedCategory}`
        : "/new";
    }
  }
};
</script>

<style>

</style>
