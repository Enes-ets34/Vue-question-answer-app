<template>
  <div class="col-md-8">
    <appAlert :type="'alert-warning'" v-if="noQuestions">
      <template #message>
        <p class="display-6">Bu kategori(lere) ait soru bulunamadı ): sormak için
          <router-link :to="`/new-question/?categoryId=${categoryId}`">hemen
            tıklayınız</router-link>
        </p>
      </template>
    </appAlert>
    <Question v-for=" question in questionList" :key="question.id" :question="question"/>
    
  </div>
</template>

<script>
import Question from "./Question.vue";

export default {
  components: { Question },
  props: {
    questionList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    noQuestions() {
      return this.questionList.length === 0
    },
    categoryId() {
      return this.$store.getters["categories/getSelectedCategories"]?.find(c => c.isSelect)?.id
    }
  },

};
</script>

<style>

</style>
