<template>
  <div v-if="isLoaded" class="p-2 my-5">
    <div class="col-md-6 mx-auto mt-5 shadow ">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h4>{{ question.title }}</h4>
          <div v-if="questionOwner">
            <a
              href="#"
              v-if="!editQuestion"
              @click="editQuestion = true"
              class="text-dark"
              ><i class="fas fa-edit"></i> Düzenle</a
            >
            <a href="#" v-else @click="editQuestion = false" class="text-danger"
              ><i class="fas fa-edit"></i> İptal</a
            >
          </div>
        </div>
        <div class="card-body">
          <quill-editor v-if="editQuestion" v-model:value="updatedQuestion">
          </quill-editor>
          <p v-else class="card-text" v-html="question.content"></p>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <button
              @click="updateQuestion"
              v-if="editQuestion"
              class="btn btn-dark"
            >
              Güncelle
            </button>
            <small class="card-text text-muted">
              <i class="fas fa-user"></i> {{ question?.user?.name }}
              {{ timesAgo(question.created_at) }} sordu.</small
            >
            <small class="card-text text-muted"
              ><i class="fas fa-list me-1"></i
              >{{ question?.category?.title }}</small
            >
          </div>
        </div>
        <div class="card-footer">
          <quill-editor
            v-model:value="userData.content"
            placeholder="Bu soruya yanıt ekle..."
          />

          <button @click="addAnswer()" class="btn btn-outline-dark mt-1">
            Yanıtla <i class="fas fa-paper-plane"></i>
          </button>

          <hr />
          <div class="text-center">
            <div
              v-if="answerLoading"
              class="spinner-border text-dark m-5 "
              style="width: 1.5rem; height: 1.5rem;"
              role="status"
            ></div>
          </div>
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
            @removeAnswer="removeAnswer(answer)"
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
import { mapGetters } from "vuex";

export default {
  mixins: [helperMixin],
  data() {
    return {
      question: null,
      isLoaded: false,
      answerLoading: false,
      userData: {
        content: null,
        questionId: Number(this.$route.params.id)
      },
      user: null,
      updatedQuestion: null,
      editQuestion: false
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    }),
    questionOwner() {
      return this.currentUser?.id === this.question?.user?.id;
    }
  },
  components: {
    Answer
  },
  methods: {
    addAnswer() {
      this.answerLoading = true;
      let answer = {
        ...this.userData,
        created_at: new Date(),
        userId: this.currentUser.id,
        likes: [],
        dislikes: []
      };
      setTimeout(() => {
        this.$store.dispatch("questions/saveAnswer", answer);
        this.question.answers.unshift({ ...answer });
        this.answerLoading = false;
        this.userData.content = "";
      }, 500);

      // this.$router.push({ name: "Home" });
    },
    removeAnswer(answer) {
      this.question.answers = this.question.answers.filter(
        i => i.id !== answer.id
      );
    },
    updateQuestion() {
      console.log(this.updatedQuestion);

      appAxios
        .patch(`/questions/${this.$route.params.id}`, {
          updated_at: new Date(),
          content: this.updatedQuestion
        })
        .then(res => {
          this.question.content = this.updatedQuestion;
          this.editQuestion = false;
        })
        .catch(err => console.error(err));
    },
    fetchAnswers() {
      appAxios
        .get(
          `/answers/?questionId=${this.$route.params.id}&_embed=likes&_embed=dislikes&_sort=created_at&_order=desc&_expand=user`
        )
        .then(res => {
          this.question.answers = res?.data || [];
        });
    }
  },
  created() {
    appAxios
      .get(`/questions/${this.$route.params.id}?_expand=category&_expand=user`)
      .then(res => {
        setTimeout(() => {
          this.question = { ...res.data };
          this.question.answers = [];
          this.fetchAnswers();

          this.isLoaded = true;
        }, 500);
      })
      .catch(err => console.error(err));
  },
  watch: {
    editQuestion(editQuestion) {
      if (editQuestion) {
        this.updatedQuestion = this.question.content;
        console.log(this.updatedQuestion);
      } else {
        this.updatedQuestion = null;
      }
    }
  }
};
</script>
