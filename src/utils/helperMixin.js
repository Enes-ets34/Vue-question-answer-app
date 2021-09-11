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

const helperMixin = {
  methods: {
    timesAgo(time) {
      return moment(time).fromNow();
    }
  }
};
export default helperMixin;
