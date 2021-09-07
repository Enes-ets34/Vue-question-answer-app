import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Header from "./components/appShared/Header.vue";
createApp(App)
  .use(store)
  .use(router)
  .component("Header",Header)
  .mount("#app");
