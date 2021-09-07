<template>
  <div class="home">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-3 ">
          <categories></categories>
        </div>
        <div class="col-md-8">
          <QuestionList :questionList="questionList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "../components/Home/Categories.vue";
import QuestionList from "../components/Home/QuestionList.vue";
import { appAxios } from "../utils/appAxios";
// @ is an alias to /src

export default {
  name: "Home",
  components: { Categories, QuestionList },

  data() {
    return {
      questionList: []
    };
  },
  created() {
    appAxios
      .get("/questions?_expand=category")
      .then(res => {
        console.log(res.data);

        this.questionList = res?.data || [];
      })
      .catch(err => console.error(err));
  }
};
</script>
