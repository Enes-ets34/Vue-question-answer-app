import { appAxios } from "../../utils/appAxios";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    like(_, pLike) {
      appAxios.post("/likes", pLike).then(res => console.log(res));
    },
    dislike(_, pDislike) {
      appAxios.post("/dislikes", pDislike);
    }
  },
  getters: {}
};
