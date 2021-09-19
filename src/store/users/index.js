import { appAxios } from "../../utils/appAxios";
import router from "../../router/index";
export default {
  namespaced: true,
  state: {
    user: null,
    favorites: []
  },
  mutations: {
    setUser(state, pUser) {
      state.user = pUser;
    },
    logout(state) {
      state.user = null;
    },
    setFavorites(state, pFavorites) {
      state.favorites = pFavorites;
    },
    addFavorites(state, pFavorite) {
      state.favorites.push(pFavorite);
    },

    deleteFavorite(state, favoriteID) {
      state.favorites = state.favorites.filter(f => f.id !== favoriteID);
    }
  },
  actions: {
    register({ commit }, pUser) {
      appAxios
        .post("users", pUser)
        .then(res => {
          console.log(res);
          commit("setUser", res?.data);
          localStorage.user = JSON.stringify(res?.data[0]);
          dispatch("setFavorites");
          router.push("/");
        })
        .catch(err => console.error(object));
    },
    login({ commit, dispatch }, pUser) {
      appAxios
        .get(`/users?email=${pUser.email}&password=${pUser.password}`)
        .then(res => {
          if (res?.status === 200 && res?.data?.length > 0) {
            commit("setUser", res?.data[0]);
            localStorage.user = JSON.stringify(res?.data[0]);
            dispatch("setFavorites");
            router.push("/");
          }
        })
        .catch(err => console.error(err));
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("user");
      router.push({ name: "Home" });
    },
    setFavorites({ commit, state }) {
      if (state.user !== null) {
        appAxios
          .get(`/favorites?userId=${state.user.id}&_expand=question`)
          .then(res => commit("setFavorites", res?.data))
          .catch(err => console.error(err));
      }
    },
    addToFavorites({ state, commit }, pFavorite) {
      const matchedFavorite = state.favorites.find(
        f => f.questionId === pFavorite.id
      );
      if (matchedFavorite) {
        // Eğer varsa favori listesinden çıkar.
        appAxios
          .delete(`/favorites/${matchedFavorite.id}`, {
            headers: { noLoading: true }
          })
          .then(delete_response => {
            console.log("delete_response", delete_response);
            commit("deleteFavorite", matchedFavorite.id);
          });
      } else {
        // Eğer yoksa favori listesine ekle..
        // state.favorites.push(pFavorite);
        const favoriteItem = {
          questionId: pFavorite.id,
          created_at: new Date(),
          userId: state.user.id
        };
        appAxios
          .post("/favorites", favoriteItem, { headers: { noLoading: true } })
          .then(favorite_response => {
            console.log("favorite_response", favorite_response);
            commit("addFavorites", favorite_response?.data);
          });
      }
    }
  },
  getters: {
    currentUser: state => state.user,
    favorites: state => state.favorites,
    isAuth: state => state.user !== null
  }
};
