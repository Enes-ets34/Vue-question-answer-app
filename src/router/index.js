import { createRouter, createWebHistory } from "vue-router";
import Header from "../components/appShared/Header.vue";

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
    path: "/question-detail",
    name: "QuestionDetail",

    components: { default: () => import("../views/QuestionDetail.vue"), Header }
  },
  {
    path: "/login",
    name: "Login",

    component: () => import("../views/Login.vue")
  },
  {
    path: "/new",
    name: "NewQuestion",

    components: { default: () => import("../views/NewQuestion.vue"), Header }
  },
  {
    path: "/my-favorites",
    name: "MyFavorites",

    components: { default: () => import("../views/User/MyFavorites.vue"), Header }
  },
  {
    path: "/profile",
    name: "Profile",

    components: { default: () => import("../views/User/Profile.vue"), Header }
  },
  {
    path: "/my-questions",
    name: "MyQuestions",

    components: { default: () => import("../views/User/MyQuestions.vue"), Header }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
