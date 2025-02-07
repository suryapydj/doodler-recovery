import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import GameRoom from "../components/GameRoom.vue";
import GameRoomPage from "../components/GameRoomPage.vue";
import Canvas from "../components/Canvas.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/game-room", component: GameRoom },
  {
    path: "/game-room/:roomCode",
    name: "GameRoomPage",
    components: { default: GameRoomPage, canvas: Canvas },
    props: true,
  },
  { path: "/canvas/:gameCode", component: Canvas, props: true },
  /* { path: '/game-room/:roomCode', component: GameRoom, props: true },  some issue here prob */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
