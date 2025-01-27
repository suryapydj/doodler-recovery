<template>
  <div class="game-room">
    <h2>Your Game Room Code: {{ roomCode }}</h2>
    <p>Choose a name for your room:</p>
    <input v-model="roomName" placeholder="Enter room name" />
    <button @click="createGameRoom">Create Room</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const roomName = ref('');
const roomCode = ref(route.params.roomCode); 

const createGameRoom = () => {
  if (roomName.value) {
    roomCode.value = Math.random().toString(36).substr(2, 6).toUpperCase(); 
    console.log('Room created: ', roomCode.value);
  }
};
</script>

<style scoped>
.game-room {
  padding: 20px;
  background-color: #f8f9fa;
}

h2 {
  color: #007bff;
}
p {
  color: #007bff;
}
</style>
