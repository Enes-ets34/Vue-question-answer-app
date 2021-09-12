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
    newQuestion(state, question) {
      state.questions.unshift(question);
    },
    filterQuestions(state, filteredList) {
      state.questions = filteredList;
    }
  },
  actions: {
    fetchQuestions({ commit }, selectedCategories) {
      let url =
        "/questions?_expand=category&_sort=created_at&_order=desc&_embed=answers";
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
        .post("/questions", userData)
        .then(res => commit("newQuestion", res?.data))
        .catch(err => console.error(err));
    },
    filterQuestions({ commit, state }, key) {
      let filteredList = state.questions.filter(
        i => i.title.includes(key) || state.questions
      );
      commit("filterQuestions", filteredList);
    }
  },
  getters: {
    getQuestions: state => state.questions
  }
};
