<template>
  <div>
    <h1>Welcome to Room {{ roomCode }}</h1>
    <p>Players in this room:</p>
    <ul>
      <li v-for="player in players" :key="player">{{ player }}</li> /* the players thing looks weird we might remove it. it shows their socket id so its just a bunch of random numbers*/
    </ul>
    <button @click="start">Start</button>
    <Canvas v-if="gameStarted"></Canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import { useSocket } from "../socket.ts";

// this is important to understand https://www.matijanovosel.com/blog/define-component-vs-script-setup

export default defineComponent({
  setup() {
    const route = useRoute();
    //const router = useRouter();
    const roomCode = route.params.roomCode as string;
    const socket = useSocket();
    let gameStarted = ref(false)
    const players = ref<string[]>([]);

    const start = () => {
      socket.emit("startGame", {roomCode});
    };

    socket.on("gameStarted", () => {
      console.log("game started!");
      gameStarted.value = true;
    });

    const setupSocketListeners = () => {
      socket.on("roomDetails", (data) => {
        players.value = data.players;
      });
    };

    //socket.emit("joinRoom", { roomCode });
    setupSocketListeners();

    onBeforeUnmount(() => {
      socket.off("roomDetails");
    });

    return {
      roomCode,
      players,
      start,
      gameStarted,
    };
  },
});
</script>
