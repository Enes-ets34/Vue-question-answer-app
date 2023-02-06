import moment from "moment";
moment.updateLocale("tr", {
  relativeTime: {
    future: "%s içinde",
    past: "%s  önce",
    s: "bir kaç saniye  önce",
    ss: "%d saniye  ",
    m: "bir dakika önce",
    mm: "%d dakika  ",
    h: "bir saat  önce",
    hh: "%d saat ",
    d: "bir gün ",
    dd: "%d gün ",
    w: "bir hafta önce",
    ww: "%d hafta ",
    M: "bir ay önce",
    MM: "%d ay ",
    y: "bir yıl önce",
    yy: "%d yıl ",
  },
});

const helperMixin = {
  methods: {
    created_at(time) {
      return moment(time).fromNow();
    },
  },
};
export default helperMixin;
