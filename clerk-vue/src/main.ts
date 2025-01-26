import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { clerkPlugin } from "@clerk/vue";
import router from "./router";
import Home from "./components/Home.vue";
import GameRoom from "./components/GameRoom.vue";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(".env problem");
}

const app = createApp(App);

app.component("Home", Home);
app.component("GameRoom", GameRoom);

app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY });
app.use(router);
app.mount("#app");
