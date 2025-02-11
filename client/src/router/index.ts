import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import CreateRoom from "../components/CreateRoom.vue";
import JoinRoom from "../components/JoinRoom.vue";
import GameRoom from "../components/GameRoom.vue";
import Canvas from "../components/Canvas.vue";

const routes = [
  { path: "/", component: Home },
  {path: "/create", component: CreateRoom},
  {path: "/join", component: JoinRoom},
  {
    path: "/room/:roomCode",
    name: "GameRoom",
    components: { default: GameRoom, canvas: Canvas },
    props: true,
  },
  /* { path: '/game-room/:roomCode', component: GameRoom, props: true },  some issue here prob */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
