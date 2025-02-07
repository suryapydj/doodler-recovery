<template>
  <div>
    <h1>Welcome to Room {{ roomCode }}</h1>
    <p>Players in this room:</p>
    <ul>
      <li v-for="player in players" :key="player">{{ player }}</li> /* the players thing looks weird we might remove it. it shows their socket id so its just a bunch of random numbers*/
    </ul>
    <button @click="start">Start</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSocket } from "../socket.ts";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const roomCode = route.params.roomCode as string;
    const socket = useSocket();

    const players = ref<string[]>([]);

    const start = () => {
      router.push(`/canvas/${roomCode}`);
    };

    const setupSocketListeners = () => {
      socket.on("roomDetails", (data) => {
        players.value = data.players;
      });
    };

    socket.emit("joinRoom", { roomCode });
    setupSocketListeners();

    onBeforeUnmount(() => {
      socket.off("roomDetails");
    });

    return {
      roomCode,
      players,
      start,
    };
  },
});
</script>