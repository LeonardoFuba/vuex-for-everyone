import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { store, key } from "./store";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

const app = createApp(App);
app.use(vuetify);
app.use(store, key);
app.mount("#app");
