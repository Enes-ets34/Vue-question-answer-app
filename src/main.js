import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/style.css";
import Header from "./components/appShared/Header.vue";
import appLoading from "./components/Loading.vue";

import { quillEditor } from "vue3-quill";
createApp(App)
  .use(store)
  .use(router)
  .use(quillEditor)
  .component("Header", Header)
  .component("appLoading", appLoading)
  .mount("#app");
