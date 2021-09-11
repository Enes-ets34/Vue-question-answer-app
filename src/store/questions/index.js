import { appAxios } from "../../utils/appAxios";

export default {
  namespaced: true,
  state: {
    questions: []
  },
  mutations: {
    setQuestions(state, pQuestions) {
      state.questions = pQuestions;
    },
    fillQuestion(state, userData) {
      state.questions.push(userData);
    }
  },
  actions: {
    fetchQuestions({ commit }, selectedCategories) {
      let url = "/questions?_expand=category&_sort=created_at&_order=desc&_embed=answers";
      if (selectedCategories) {
        const IDs = selectedCategories
          .filter(c => c.selected)
          .map(c => `categoryId=${c.id}`)
          .join("&");
        url = `${url}&${IDs}`;
      }
      appAxios
        .get(url)
        .then(res => commit("setQuestions", res?.data || []))
        .catch(err => console.error(err));
    },
    saveQuestion({ commit }, userData) {
      appAxios
        .post("/questions", { ...userData })
        .then(res => commit("fillQuestion", { ...userData }))
        .catch(err => console.error(err));
    }
  },
  getters: {
    getQuestions: state => state.questions
  }
};
