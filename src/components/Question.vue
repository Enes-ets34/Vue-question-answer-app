<template>
  <div class="card mb-3">
    <div class="card-header">
      <h4>{{ question.title }}</h4>
    </div>
    <div class="card-body">
      <p class="card-text">
        {{ question.content }}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="card-text text-muted">
          <i class="fas fa-user"></i> Enes Taha Sarı
          {{ timesAgo(question.created_at) }} sordu.
        </small>

        <small class="card-text w-50 text-end text-muted text-wrap "
          ><i class="fas fa-list me-1"></i>{{ question?.category?.title }}
        </small>
      </div>
    </div>
    <div class="card-footer align-items-center d-flex justify-content-between">
      <div>
        <small>
          <b
            ><i class="fas fa-comment-dots"></i> {{ answerCount }}</b
          ></small
        >
        <small class="text-muted ms-1">| 2 Gün önce</small>
      </div>
      <router-link tag="button" :to="showQuestion" class="btn btn-outline-dark">
        Soruyu görüntüle
      </router-link>
    </div>
  </div>
</template>

<script>
import helperMixin from "../utils/helperMixin";
export default {
  mixins: [helperMixin],
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log("this.question :>> ", this.question);
  },

  computed: {
    showQuestion() {
      return `/question-detail/${this.question.id}`;
    },
    answerCount() {
      if (this.question.answers.length === 0) {
        return "henüz cevap yok.";
      } else {
        return this.question.answers.length + " Cevap"
      }
    }
  }
};
</script>

<style></style>
