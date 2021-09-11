<template>
  <div v-if="isLoaded" class="col-md-6 mx-auto mt-5">
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
        <div class="card ">
          <div class="card-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
            quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quos quasi hic ab ipsa sit. Dolorum excepturi eaque quo voluptas
            perferendis.
          </div>
          <div
            class="card-footer d-flex justify-content-between align-items-center"
          >
            <small class="card-text text-muted">
              <i class="fas fa-user"></i> Gokhan Kandemir 1 gün önce
              cevapladı.</small
            >
            <small class="card-text text-muted d-flex">
              <span
                class=" d-flex justify-content-between align-items-center me-2"
              >
                <i class="far fa-thumbs-up"></i>
                ( 3 )
              </span>
              <span class=" d-flex justify-content-between align-items-center">
                <i class="far fa-thumbs-down"></i>
                ( 1 )
              </span>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-loading v-else></app-loading>
</template>

<script>
import helperMixin from "../utils/helperMixin";
import { appAxios } from "../utils/appAxios";

export default {
  mixins: [helperMixin],
  data() {
    return {
      question: null,
      isLoaded: false
    };
  },
  created() {
    appAxios
      .get(`/questions/${this.$route.params.id}?_expand=category`)
      .then(res => {
        setTimeout(() => {
          this.question = { ...res.data };
          this.isLoaded = true;
        }, 1000);
      })
      .catch(err => console.error(err));
  }
};
</script>
