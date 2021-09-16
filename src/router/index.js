import { isObject } from "util";
import { createRouter, createWebHistory } from "vue-router";
import Header from "../components/appShared/Header.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    // component: Home,
    components: {
      default: () => import("../views/Home.vue"),
      Header
    }
  },

  {
    path: "/question-detail/:id",
    name: "QuestionDetail",

    components: { default: () => import("../views/QuestionDetail.vue"), Header }
  },
  {
    path: "/login",
    name: "Login",

    component: () => import("../views/User/Login.vue")
  },
  {
    path: "/new",
    name: "NewQuestion",

    components: { default: () => import("../views/NewQuestion.vue"), Header }
  },
  {
    path: "/favorites",
    name: "Favorites",

    components: {
      default: () => import("../views/User/MyFavorites.vue"),
      Header
    }
  },
  {
    path: "/profile",
    name: "Profile",

    components: { default: () => import("../views/User/Profile.vue"), Header }
  },
  {
    path: "/my-questions",
    name: "MyQuestions",

    components: {
      default: () => import("../views/User/MyQuestions.vue"),
      Header
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  let user = null;
  const authenticatedPages = ["Account", "Favorites", "Profile", "NewQuestion"];
  if (localStorage?.user) user = JSON.parse(localStorage?.user);
  if (isObject(user)) {
    store.commit("users/setUser", user);
  }

  const isAuth = store.getters["users/isAuth"];
  if (!isAuth && authenticatedPages.indexOf(to.name) > -1) {
    next({ name: "Login" });
    console.log(isAuth);
  }
  if (isAuth && to.name === "Login") {
    next({ name: "Home" });
  }

  next();
});
export default router;
