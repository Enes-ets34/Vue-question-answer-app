import { appAxios } from "../../utils/appAxios";

export default {
  namespaced: true,

  state: {
    categories: []
  },
  mutations: {
    setCategories(state, pCategories) {
      state.categories = pCategories.map(c => {
        return {
          ...c,
          selected: false
        };
      });
    }
    // addToSelectedCategories(state, category) {
    //   if (!state.selectedCategories.find(i => i.id === category.id)) {
    //     state.selectedCategories.push(category);
    //   }else{
    //     state.selectedCategories=state.selectedCategories.filter(c=>c.id!==category.id)
    //   }
    // }
  },
  actions: {
    fetchCategories({ commit }) {
      appAxios
        .get("/categories")
        .then(res => commit("setCategories", res?.data || []))
        .catch(err => console.error(err));
    }
  },
  getters: {
    getCategories: state => state.categories,
    getSelectedCategories: state => state.categories.filter(c => c.selected)
  }
};
