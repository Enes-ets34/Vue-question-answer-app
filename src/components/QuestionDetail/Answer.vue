<template>
  <div class="card my-2 ">
    <div
      v-if="answerOwner"
      class="card-header d-flex justify-content-between align-items-center"
    >
      <i><small class="text-muted">Yanıtınız...</small></i>
      <i @click="removeAnswer(answer)" class="far fa-trash-alt text-danger"></i>
    </div>
    <div class="card-body" v-html="answer.content"></div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <small class="card-text text-muted">
        <i class="fas fa-user"></i> {{ answer.userId }}
        {{ timesAgo(answer.created_at) }} cevapladı.</small
      >
      <small v-if="currentUser !== null" class="card-text text-muted d-flex">
        <span class=" d-flex justify-content-between align-items-center me-2">
          <i
            @click="like"
            :class="{ 'fas text-success': alreadyLiked }"
            class="far fa-thumbs-up  me-1"
          ></i>
          {{ answer?.likes.length }}
        </span>
        <span class=" d-flex justify-content-between align-items-center">
          <i
            @click="dislike"
            :class="{ 'fas text-danger': alreadyDisliked }"
            class="far fa-thumbs-down me-1"
          ></i>
          {{ answer?.dislikes.length }}
        </span>
      </small>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import helperMixin from "../../utils/helperMixin";
export default {
  mixins: [helperMixin],
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLiked: false
    };
  },
  methods: {
    ...mapActions({
      like: "likes/like",
      dislike: "likes/dislike"
    }),
    like() {
      if (this.alreadyLiked) {
        console.log("undolike");
      } else {
        this.$store.dispatch("likes/like", {
          answerId: this.answer.id,
          userId: this.currentUser.id
        });
      }
    },
    dislike() {
      this.$store.dispatch("likes/dislike", {
        answerId: this.answer.id,
        userId: this.currentUser.id
      });
    },
    removeAnswer(answer) {
      if (confirm("Cevabınızı silmek istediğinize emin misiniz?")) {
        this.$store.dispatch("questions/deleteAnswer", answer.id);
        this.$emit("removeAnswer", answer);
      }
    }
  },

  computed: {
    ...mapGetters({
      currentUser: "users/currentUser"
    }),
    alreadyLiked() {
      return Boolean(
        this.answer?.likes?.find(l => l.userId === this.currentUser.id)
      );
    },
    alreadyDisliked() {
      return Boolean(
        this.answer?.dislikes?.find(l => l.userId === this.currentUser.id)
      );
    },
    answerOwner() {
      return this.answer?.userId === this.currentUser?.id;
    }
  }
};
</script>

<style></style>
