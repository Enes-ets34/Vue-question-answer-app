<template>
  <div class=" card mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <input v-if="updateStatus" type="text" v-model="updateState.title" class="form-control">
      <h4 v-else>{{ question.title }}</h4>

      <span>
        <i v-if="$route.path.includes('/question-detail') && hasOwnQuestion" @click="edit(question)"
          class="fa-solid fa-pen-to-square me-2"></i>
        <i @click="addFavorite" v-if="currentUser" class="fa-regular fa-heart"></i>
      </span>
    </div>
    <div class="card-body">

      <span v-if="!updateStatus" v-html="question.details"></span>
      <QuillEditor v-else toolbar="full" v-model:content="updateState.details" contentType="html" theme="snow"
        placeholder="Sorunuzu buraya yazınız..."></QuillEditor>
      <div class="d-flex justify-content-between align-items-center my-2">
        <small class="text-secondary">
          <i class="fa-solid fa-user me-1"></i> {{ question?.user?.full_name }}
          {{ created_at(question.created_at) }} sordu
        </small>
        <small class="text-secondary">
          <i class="fa-regular fa-hashtag me-1"></i>
          {{ question.category?.title }}
        </small>

      </div>
    </div>
    <div class="card-footer">
      <div v-if="$route.path === '/'" class="d-flex justify-content-between align-items-center">
        <small>

          <b><i class="fa-solid fa-Answer-dots me-1"></i>{{ answerCount }}</b>
          <span class="ms-1"> {{ lastAnswerDate }}</span>
        </small>

        <small class="text-secondary">
          <router-link tag="button" :to="`/question-detail/${question.id}`" class="btn btn-sm btn-outline-dark">
            Soruyu Görüntüle <i class="fa-solid fa-eye"></i>
          </router-link>
        </small>
      </div>

      <div v-if="$route.path.includes('/question-detail')">
        <div v-if="updateStatus" class="d-grid gap-2">
          <button @click="$store.dispatch('questions/updateQuestion', this.updateState)"
            class="btn btn-warning">Update</button>
          <button @click="updateStatus = false" class="btn btn-danger">Cancel</button>
        </div>

        <div v-if="currentUser">
          <QuillEditor toolbar="full" v-model:content="answerDetails" contentType="html" theme="snow"
            placeholder="Yanıtınızı buraya yazınız...">
          </QuillEditor>
          <button @click="saveAnswer(question.id)" class="btn btn-outline-secondary mt-2">
            Yanıtla<i class="fa-solid fa-paper-plane ms-1"></i>
          </button>
        </div>
        <appAlert v-else :type="'alert-success'">
          <template #message>
            <p>Yorum yapmak için <router-link to="/login">buraya </router-link> tıklayarak giriş yapınız...
            </p>
          </template>
        </appAlert>


        <Loader v-if="loader" style="width: 2rem; height: 2rem;" />
        <Answer v-for="answer in answers" :key="answer.id" :answer="answer" />
        <appAlert :type="'alert-dark'" v-if="!question?.answers?.length">

          <template #message>
            <p>Hiç yorum yok...

            </p>
          </template>

        </appAlert>
      </div>
    </div>

  </div>
</template>

<script>
import { appAxios } from '@/utils/appAxios.js';
import Answer from "./Answer.vue";
import helperMixin from '../../utils/helperMixin';
import Loader from '../appShared/Loader.vue';
import { mapGetters } from 'vuex';


export default {
  components: { Answer, Loader },
  mixins: [helperMixin],
  props: {
    question: {
      type: Object,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      answerDetails: null,
      loader: false,
      updateStatus: false,
      updateState: null
    }
  },
  methods: {
    saveAnswer(ID) {
      appAxios.post("/answers", {
        details: this.answerDetails,
        questionId: ID,
        created_at: new Date()
      }).then(res => {
        this.loader = true
        setTimeout(() => {

          this.question?.answers.unshift(res.data)
          this.answerDetails = null
        }, 1500);
      })
        .catch(err => console.error(err))

    },
    edit(question) {
      this.updateStatus = true,
        //  this.updateState = JSON.parse(JSON.stringify(this.question))
        this.updateState = { ...question }
    },
    addFavorite() {

    }
  },
  computed: {
    answerCount() {
      if (this.question?.answers?.length === 0) {
        return "Henüz hiç cevap yok"
      } else {
        return this.question?.answers?.length + " cevap"
      }
    },
    ...mapGetters({
      currentUser: "users/currentUser"
    }),
    lastAnswerDate() {
      return this.question?.answers?.length ? " | " + this.created_at(this.question.answers[this.question.answers.length - 1].created_at) : ""
    },
    hasOwnQuestion() {
      return this.question.userId === this?.currentUser?.id
    }
  },
  watch: {
    loader(val) {
      if (val === true) {
        setTimeout(() => {
          this.loader = false
        }, 1500);
      }
    }
  },
  created() {
    console.log('this.question :>> ', this.question);
  }
}
</script>

<style>

</style>
