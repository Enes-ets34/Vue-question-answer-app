<template>
  <div class="home">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-3 ">
          <categories></categories>
        </div>
        <div class="col-md-8">

            <QuestionList  />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Categories from "../components/Home/Categories.vue";
import QuestionList from "../components/Home/QuestionList.vue";

// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Categories,
    QuestionList
  },

  data() {
    return {};
  }
};
</script>
<style>

</style>
