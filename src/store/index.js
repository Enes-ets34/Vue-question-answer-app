import { createStore } from "vuex";
import categories from "./categories";
import questions from "./questions";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    categories,
    questions
  }
});
