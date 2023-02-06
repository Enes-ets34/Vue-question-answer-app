import { appAxios } from "@/utils/appAxios";

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories.map((c) => {
        return {
          ...c,
          isSelect: false,
        };
      });
    },
  },
  actions: {
    fetchCategories({ commit }) {
      appAxios
        .get("/categories")
        .then((res) => {
          commit("setCategories", res?.data || []);
        })
        .catch((err) => console.error(err));
    },
  },
  getters: {
    getCategories: (state) => state.categories,
    getSelectedCategories: (state) =>
      state.categories.filter((c) => c.isSelect),
  },
};
