<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '@clerk/vue';
import { useRouter } from 'vue-router';
import { useSocket } from '../socket.ts';

const { user, isSignedIn } = useUser();
const router = useRouter();
const socket = useSocket();

const roomCode = ref('');
const errorMessage = ref('');

const joinRoom = () => {
  if (roomCode.value) {
    socket.emit('joinRoom', { roomCode: roomCode.value });
    socket.on('joinedRoom', () => {
      router.push(`/game-room/${roomCode.value}`);
    });

    socket.on('noRoom', (message) => {
      errorMessage.value = message;
    });
  } else {
    errorMessage.value = 'no rc';
  }
};

const navigateToGameRoom = () => {
  router.push('/game-room');
};
</script>

<template>
  <div v-if="isSignedIn">
    <h1>Welcome, {{ user?.fullName }}!</h1>
    <input v-model="roomCode" placeholder="Enter Room Code" />
    <button @click="joinRoom">Join Game Room</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button @click="navigateToGameRoom" class="create-game-btn">Create Game Room</button>
  </div>
  <div v-else>
    <h1>shouldnt happen</h1>
  </div>
</template>

<style scoped>
button {
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
