<template>
  <div class="card mb-3 shadow">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4>{{ question.title }}</h4>
      <h5 v-if="isAuth">
        <i
          @click="addToFavorites(question)"
          class="fas fa-heart"
          :class="{ 'text-warning': isFavorite, 'text-muted': !isFavorite }"
        ></i>
      </h5>
    </div>
    <div class="card-body">
      <p class="card-text" v-html="question.content"></p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="card-text text-muted">
          <i class="fas fa-user"></i> {{ question.user.name }}
          {{ timesAgo(question.created_at) }} sordu.
        </small>

        <small class="card-text w-50 text-end text-muted text-wrap "
          ><i class="fas fa-list me-1"></i
          >{{ question?.category?.title || "-" }}
        </small>
      </div>
    </div>
    <div class="card-footer align-items-center d-flex justify-content-between">
      <router-link
        tag="div"
        class="text-dark text-decoration-none"
        :to="showQuestion"
      >
        <small>
          <b><i class="fas fa-comment-dots"></i> {{ answerCount }}</b></small
        >
        <small v-if="question?.answers.length !== 0" class="text-muted ms-1"
          >| {{ timesAgo(answerDate) }}
        </small>
      </router-link>
      <router-link
        tag="button"
        :to="showQuestion"
        class="btn btn-outline-dark d-none d-sm-block"
      >
        Soruyu görüntüle
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import helperMixin from "../utils/helperMixin";
export default {
  mixins: [helperMixin],

  props: {
    question: {
      type: Object,
      required: true
    },
    favoriteItem: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    ...mapActions({
      addToFavorites: "users/addToFavorites"
    })
  },
  computed: {
    ...mapGetters({
      isAuth: "users/currentUser",
      favorites: "users/favorites"
    }),
    answerCount() {
      if (this.question?.answers !== undefined) {
        const count = this.question.answers?.length || 0;
        return count > 0 ? `${count} cevap` : "Cevap Yok";
      }
    },
    answerDate() {
      if (
        this.question?.answers.length !== 0 ||
        this.question?.answers.type === undefined
      ) {
        return this.question?.answers[this.question?.answers.length - 1]
          .created_at;
      } else {
        return false;
      }
    },
    isFavorite() {
      return this.favorites.find(f => f.questionId === this.question.id);
    },
    showQuestion() {
      return `/question-detail/${this.question.id}`;
    }
  }
};
</script>

<style></style>
