import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import { vuexAuthStore } from "./examples/vuex/authStore";

const app = createApp(App);

app.use(createPinia());
app.use(vuexAuthStore);
app.mount("#app");
