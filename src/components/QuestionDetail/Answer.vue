<template>
  <div class="card my-2 ">
    
    <div class="card-body">
      {{ answer.content }}
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <small class="card-text text-muted">
        <i class="fas fa-user"></i> {{ answer.userId }}
        {{ timesAgo(answer.created_at) }} cevapladı.</small
      >
      <small class="card-text text-muted d-flex">
        <span class=" d-flex justify-content-between align-items-center me-2">
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
</template>

<script>
import helperMixin from "../../utils/helperMixin";
export default {
  mixins: [helperMixin],
  props: {
    answer: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
