import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue' 
import GameRoom from '../components/GameRoom.vue' 

const routes = [
  { path: '/', component: Home },
  { path: '/game-room', component: GameRoom } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
