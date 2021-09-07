<template>
  <div class="home">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-3 ">
          <categories></categories>
        </div>
        <div class="col-md-8">
          <question v-for="i in 10" :key="i"></question>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "../components/Home/Categories.vue";
import Question from "../components/Question.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: { Categories, Question },
};
</script>
