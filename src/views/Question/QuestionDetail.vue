<template>
  <appNavbar />
  <div class="row">
    <div class="col-md-8 mx-auto ">
      <Question v-if="question" :question="question" :answers="answers" />


      <Loader v-else />


    </div>
  </div>
</template>

<script>
import { appAxios } from "@/utils/appAxios";
import Question from "../../components/Question/Question.vue";
import Loader from '../../components/appShared/Loader.vue';
export default {
  components: { Question, Loader },
  data() {
    return {
      question: null,
      answers: []
    };
  },
  created() {


    setTimeout(() => {
      appAxios
        .get(`/questions/${this.$route.params.id}?_expand=category&_expand=user`)
        .then((res) => {

          this.question = res?.data;
          this.fetchAnswers()
          console.log('res.data :>> ', res.data);
          appAxios
            .get(`answers?questionId=${this.$route.params.id}&_expand=user`)
            .then((res) => {

              this.answers = res?.data;


            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);

  },
  methods: {
    fetchAnswers() {
      appAxios
        .get(
          `/answers/?questionId=${this.$route.params.id}&_sort=created_at&_order=desc`
        )
        .then(res => {
          this.question.answers = res?.data || [];
        });
    }
  }
};
</script>

<style scoped>

</style>
