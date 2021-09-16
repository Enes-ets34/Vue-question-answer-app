import { createStore } from "vuex";
import categories from "./categories";
import questions from "./questions";
import users from "./users";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    categories,
    questions,
    users
  }
});
