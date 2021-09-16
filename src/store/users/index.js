import { appAxios } from "../../utils/appAxios";
import router from "../../router/index";
export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, pUser) {
      state.user = pUser;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    register({ commit }, pUser) {
      appAxios
        .post("users", pUser)
        .then(res => {
          console.log(res);
          commit("setUser", pUser);
        })
        .catch(err => console.error(object));
    },
    login({ commit }, pUser) {
      appAxios
        .get(`/users?email=${pUser.email}&password=${pUser.password}`)
        .then(res => {
          if (res?.status === 200 && res?.data?.length > 0) {
            commit("setUser", res?.data[0]);
            localStorage.user = JSON.stringify(res?.data[0]);
            router.push("/");
          }
        });
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("user");
      router.push({name:"Home"})
    }
  },
  getters: {
    currentUser: state => state.user,
    isAuth: state => state.user !== null
  }
};
