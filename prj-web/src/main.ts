import "./assets/main.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import App from "./App.vue";

const primeVueOptions = {
  theme: {
    preset: Aura,
  },
};
createApp(App).use(PrimeVue, primeVueOptions).mount("#app");
