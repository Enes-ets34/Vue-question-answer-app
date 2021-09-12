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
    },
    addAnswer(state, answer) {
      state.questions.forEach(i => i.answers.push(answer));
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
    saveAnswer({ commit }, answer) {
      appAxios.post("/answers", answer).then(res => {
        commit("addAnswer", res.data);
        console.log(res);
      });
    },
    filterQuestions({ commit, state }, key) {
      let filteredList = state.questions.filter(i =>
        i.title
          .toLowerCase()
          .includes(
            key.toLowerCase() ||
              i.content.toLowerCase().includes(key.toLowerCase())
          )
      );
      commit("filterQuestions", filteredList);
    }
  },
  getters: {
    getQuestions: state => state.questions
  }
};
