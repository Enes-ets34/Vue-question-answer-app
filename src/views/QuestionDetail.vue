<template>
  <div v-if="isLoaded" class="p-2">
    <div class="col-md-6 mx-auto mt-5 shadow ">
      <div class="card">
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
              {{ timesAgo(question.created_at) }} sordu.</small
            >
            <small class="card-text text-muted"
              ><i class="fas fa-list me-1"></i
              >{{ question?.category?.title }}</small
            >
          </div>
        </div>
        <div class="card-footer">
          <div class="form-group mb-2  d-flex align-items-center">
            <input
              v-model="userData.content"
              @keypress.enter="addAnswer()"
              type="text"
              placeholder="Bu soruya yanıt ekle..."
              class="form-control rounded-pill"
            />

            <button class="btn btn-outline">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <hr />
          <!-- Alert -->
          <div v-if="question.answers.length === 0">
            <div class="alert alert-warning">
              Bu soruya hiç bir yanıt verilmedi:(
            </div>
          </div>
          <!-- /Alert -->

          <!-- Answers -->
          <Answer
            v-else
            v-for="answer in question.answers"
            :key="answer.id"
            :answer="answer"
          />

          <!-- /Answers -->
        </div>
      </div>
    </div>
  </div>
  <app-loading v-else></app-loading>
</template>

<script>
import helperMixin from "../utils/helperMixin";
import { appAxios } from "../utils/appAxios";
import Answer from "../components/QuestionDetail/Answer.vue";

export default {
  mixins: [helperMixin],
  data() {
    return {
      question: null,
      isLoaded: false,
      userData: {
        content: null,
        questionId: Number(this.$route.params.id),
        userId: 1
      }
    };
  },
  components: {
    Answer
  },
  methods: {
    addAnswer() {
      this.$store.dispatch("questions/saveAnswer", {
        created_at: new Date(),
        ...this.userData
      });
    }
  },
  created() {
    appAxios
      .get(
        `/questions/${this.$route.params.id}?_expand=category&_embed=answers`
      )
      .then(res => {
        setTimeout(() => {
          this.question = { ...res.data };

          this.isLoaded = true;
        }, 500);
      })
      .catch(err => console.error(err));
  }
};
</script>
<style></style>
