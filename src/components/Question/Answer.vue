<template>


  <hr />
  <div class="card my-2">
    <div v-html="answer.details" class="card-body"></div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <small class="text-secondary">
        <i class="fa-solid fa-user me-1"></i> {{ answer.user.full_name }} {{ created_at(answer.created_at) }}
        yanıtladı...
      </small>

      <span>
        <span class="me-2">
          <i class="fa-solid fa-thumbs-up text-success"></i><small>(3)</small></span>
        <span class="  ">
          <i class="fa-regular fa-thumbs-down me-1"></i><small>(1)</small></span>
      </span>
    </div>
  </div>

</template>

<script>
import helperMixin from '../../utils/helperMixin';

export default {
  mixins: [helperMixin],
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log('this.answer :>> ', this.answer);
  }

};
</script>

<style>

</style>
