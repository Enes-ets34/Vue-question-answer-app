import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { QuillEditor } from "@vueup/vue-quill";

import appNavbar from "../src/components/appShared/Navbar.vue";
import appAlert from "../src/components/appShared/Alert.vue";

createApp(App)
  .use(store)
  .component("appNavbar", appNavbar)
  .component("QuillEditor", QuillEditor)
  .component("appAlert", appAlert)
  .use(router)
  .mount("#app");
