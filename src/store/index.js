import { createStore } from "vuex";
import categories from "./categories";
import questions from "./questions";
import users from "./users";
import likes from "./likes";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    initApp({ dispatch }) {
      dispatch("categories/fetchCategories");
    }
  },
  modules: {
    categories,
    questions,
    users,
    likes
  }
});
