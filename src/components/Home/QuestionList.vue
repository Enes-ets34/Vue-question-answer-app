<template>
  <Question v-for="question in questionList" :key="question.id" :question="question" />
</template>

<script>
import Question from "../../components/Question.vue";
export default {
  components: {
    Question
  },
  computed: {
    questionList() {
      return this.$store.getters["questions/getQuestions"];
    }
  }
};
</script>

<style></style>
