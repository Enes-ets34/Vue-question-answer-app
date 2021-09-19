<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mx-auto">
        <Question
          v-for="question in myQuestions"
          :key="question.id"
          :question="question"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Question from "../../components/Question.vue";
import { appAxios } from "../../utils/appAxios";

export default {
  components: { Question },
  data() {
    return {
      myQuestions: null
    };
  },
  created() {
    appAxios
      .get(`/questions?userId=${this.currentUser.id}&_expand=user&_embed=answers&_expand=category&_sort=created_at&_order=desc`)
      .then(res => {
        console.log(res.data);
        this.myQuestions = res.data;
      })
      .catch(err => console.error(err));
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    })
  }
};
</script>

<style></style>
