import { createStore } from "vuex";

import categories from "./modules/categories";
import questions from "./modules/questions";
import users from "./modules/users";

export default createStore({
  namespaced: true,
  state: {
    saltKey: "hashedBitch",
  },
  mutations: {},
  actions: {},
  getters: {
    _saltKey: (state) => state.saltKey,
  },
  modules: {
    categories,
    questions,
    users,
  },
});
