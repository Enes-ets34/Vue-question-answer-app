import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/new-question",
    name: "NewQuestion",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Question/NewQuestion.vue"
      ),
  },
  {
    path: "/question-detail/:id",
    name: "QuestionDetail",
    component: () => import("../views/Question/QuestionDetail.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("../views/Authenticated/Favorites.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Authenticated/Profile.vue"),
  },
  {
    path: "/my-questions",
    name: "MyQuestions",
    component: () => import("../views/Authenticated/MyQuestions.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  let user = null;
  let authenticatedPages = [
    "Profile",
    "Favorites",
    "MyQuestions",
    "NewQuestion",
  ];
  if (localStorage?.user) user = JSON.parse(localStorage?.user);
  store.commit("users/setCurrentUser", user);
  const isAuthenticated = store.getters["users/isAuthenticated"];
  console.log("isAuthenticated :>> ", isAuthenticated, user);

  if (isAuthenticated && (to.name === "Login" || to.name === "Register"))
    next({ name: "Home" });
  if (!isAuthenticated && authenticatedPages.indexOf(to.name) > -1)
    next({ name: "Login" });
  next();
});
export default router;
