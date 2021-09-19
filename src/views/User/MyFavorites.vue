<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 mx-auto">
        <question
          :favoriteItem="true"
          v-for="favorite in favorites"
          :key="favorite.id"
          :question="favorite.question"
        ></question>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Question from "../../components/Question.vue";
export default {
  components: { Question },
  computed: {
    ...mapGetters({
      favorites: "users/favorites"
    })
  },
  created() {
    console.log(this.favorites);
  }
};
</script>

<style></style>
