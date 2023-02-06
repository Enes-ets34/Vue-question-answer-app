import { appAxios } from "@/utils/appAxios";
import router from "@/router";
import CryptoJS from "crypto-js";
import store from "../../index";
export default {
  namespaced: true,
  state: {
    user: null,
    faviteList: [],
  },
  mutations: {
    setCurrentUser(state, pUser) {
      console.log("pUser :>> ", pUser);
      state.user = pUser;
    },
    clearCurrentUser(state) {
      state.user = null;
      router.push({ name: "Home" });
    },
    addToFavorite(state, pQuestion) {},
  },
  actions: {
    register({ commit }, pUser) {
      pUser.password = CryptoJS.HmacSHA1(
        pUser.password,
        store.getters._saltKey
      ).toString();

      appAxios
        .post("/users", pUser)
        .then((res) => {
          if (res.status === 201) {
            localStorage.user = JSON.stringify(res?.data);
            commit("setCurrentUser", res?.data);
            router.push({ name: "Home" });
          } else {
            alert("HATA");
          }

          console.log("res :>> ", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    login({ commit }, pUser) {
      pUser.password = CryptoJS.HmacSHA1(
        pUser.password,
        store.getters._saltKey
      ).toString();
      appAxios
        .get(`/users?email=${pUser.email}&password=${pUser.password}`)
        .then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            localStorage.user = JSON.stringify(res.data[0]);
            commit("setCurrentUser", res.data[0]);
            router.push({ name: "Home" });
          }
        })
        .catch((err) => console.error(err));
      // commit("setCurrentUser", pUser);
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("clearCurrentUser");
    },
    favoriteQuestion({ commit }, pQuestion) {},
  },
  getters: {
    currentUser: (state) => {
      const user = state.user;
      delete user?.password;
      return user;
    },
    isAuthenticated: (state) => state.user !== null,
  },
};
