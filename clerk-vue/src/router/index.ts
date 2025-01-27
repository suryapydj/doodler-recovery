import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue' 
import GameRoom from '../components/GameRoom.vue' 
/*import GameRoomPage from '../components/GameRoomPage.vue'; */

const routes = [
  { path: '/', component: Home },
  { path: '/game-room/:roomCode', component: GameRoom, props: true }, /* some issue here prob */
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
