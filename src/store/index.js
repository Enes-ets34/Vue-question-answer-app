import { createStore } from "vuex";
import categories from "./categories";
import questions from "./questions";
import users from "./users";
import likes from "./likes";

export default createStore({
  state: {
    saltKey: "booklike123!456?"
  },
  mutations: {},
  actions: {
    initApp({ dispatch }) {
      dispatch("categories/fetchCategories");
    }
  },
  getters: {
    _saltKey: state => state.saltKey
  },
  modules: {
    categories,
    questions,
    users,
    likes
  }
});
