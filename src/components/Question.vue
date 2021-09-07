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
        <small class="card-text text-muted"> <i class="fas fa-user"></i> Enes Taha Sarı {{ timesAgo }} sordu. </small>

        <small class="card-text w-50 text-end text-muted text-wrap "><i class="fas fa-list me-1"></i>{{  }} </small>
      </div>
    </div>
    <div class="card-footer align-items-center d-flex justify-content-between">
      <div>
        <small>
          <b><i class="fas fa-comment-dots"></i> 4 Cevap</b></small
        >
        <small class="text-muted ms-1">| 2 Gün önce</small>
      </div>
      <button class="btn btn-outline-dark">Soruyu görüntüle</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.updateLocale("tr", {
  relativeTime: {
    past: "%s önce",
    s: "birkaç saniye",
    ss: "%d birkaç saniye",
    m: "birkaç dakika",
    mm: "%d dakika",
    h: "bir saat",
    hh: "%d saat",
    d: "1 gün",
    dd: "%d gün",
    w: "bir hafta",
    ww: "%d hafta",
    M: "bir ay",
    MM: "%d ay",
    y: "bir yıl",
    yy: "%d yıl"
  }
});
export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },

  computed: {
    timesAgo() {
      return moment(this.question.created_at).fromNow();
    }
  }
};
</script>

<style></style>
