import { appAxios } from "../../utils/appAxios";

export default {
  namespaced: true,
  state: {
    questions: []
  },
  mutations: {
    setQuestions(state, pQuestions) {
      state.questions = pQuestions;
    }
  },
  actions: {
    fetchQuestions({ commit }, { selectedCategories, searchKey }) {
      let url =
        "/questions?_expand=category&&_sort=created_at&_order=desc&_embed=answers";
      if (selectedCategories) {
        const IDs = selectedCategories
          .filter(c => c.selected)
          .map(c => `categoryId=${c.id}`)
          .join("&");

        url = `${url}&${IDs}`;
      }
      if (searchKey) {
        url = `${url}?q=${searchKey}`;
      }
      appAxios
        .get(url)
        .then(res => commit("setQuestions", res?.data || []))
        .catch(err => console.error(err));
    },

    saveAnswer({ commit }, answer) {
      appAxios.post("/answers", answer).then(res => {
        commit("addAnswer", res.data);
        console.log(res);
      });
    }
  },
  getters: {
    getQuestions: state => state.questions
  }
};
