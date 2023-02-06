import { appAxios } from "@/utils/appAxios";
import router from "../../../router/index";
import users from "../users";

export default {
  namespaced: true,
  state: {
    questions: [],
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    addQuestion(state, userData) {
      state.questions.unshift(userData);
      
    },
  },
  actions: {
    fetchQuestions({ commit }, { categories, searchKey }) {

      let url =
        "/questions?_expand=category&_expand=user&_sort=created_at&_order=desc&_embed=answers";
      //SearchKey var ise
      if (searchKey) {
        url = `${url}&q=${searchKey}`;
      }

      //Kategori var ise
      if (categories) {
        console.log('categories :>> ', categories);
        const IDs = categories
          .filter((c) => c.isSelect)
          .map((c) => {
            return "categoryId=" + c.id;
          })
          .join("&");

        url = `${url}&${IDs}`;
      }

      appAxios
        .get(url)
        .then((res) => {
          commit("setQuestions", res?.data || []);
        })
        .catch((err) => console.error(err));
    },
    saveQuestion({ commit }, userData) {
      appAxios
        .post("/questions", {
          ...userData,
          created_at: new Date(),
          userId: users.state.user.id,
        })
        .then((res) => {
          if (res.status === 201) {
            commit("addQuestion", res?.data);
            router.push({ name: "Home" });
          }
        })
        .catch((e) => console.error(e));
    },
    updateQuestion({ commit }, userData) {
      if (confirm("guncellemek istediginize emin misiniz?")) {
        appAxios
          .patch(`/questions/${userData.id}`, userData)
          .then((res) => {
            location.reload();
            console.log("userData :>> ", res);
          })
          .catch((err) => console.error(err));
      }
    },
  },
  getters: {
    getQuestions: (state) => state.questions,
  },
};
