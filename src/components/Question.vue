<template>
  <div class="card mb-3 shadow">
    <div class="card-header">
      <h4>{{ question.title }}</h4>
    </div>
    <div class="card-body">
      <p class="card-text" v-html="question.content"></p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="card-text text-muted">
          <i class="fas fa-user"></i> Enes Taha Sarı
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
    console.log(this.question.answers);
  },

  computed: {
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
    showQuestion() {
      return `/question-detail/${this.question.id}`;
    },
    answerCount() {
      const count = this.question?.answers?.length || 0;
      return count > 0 ? `${count} cevap` : "Cevap Yok";
    }
  }
};
</script>

<style>

</style>
