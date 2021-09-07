<template>
  <Question v-for="question in questionList" :key="question.id" :question="question" />
</template>

<script>
import Question from "../../components/Question.vue";
export default {
  components: {
    Question
  },
  props: {
    questionList: {
      type: Array,
      required: false
    }
  }
};
</script>

<style></style>
