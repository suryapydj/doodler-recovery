<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '@clerk/vue';
import { useRouter } from 'vue-router';
import { useSocket } from '../socket.ts';

const { user, isSignedIn } = useUser();
const router = useRouter();
const socket = useSocket();

const roomCode = ref('');
const password = ref('');
const errorMessage = ref('');

const joinRoom = () => {
  if (roomCode.value && password.value) {
    socket.emit('joinRoom', { roomCode: roomCode.value, password: password.value });
    socket.on('joinedRoom', (data) => {
      console.log(`Joined room: ${data.roomName} (code: ${roomCode.value})`);
      router.push(`/game-room/${roomCode.value}`);
    });

    socket.on('incorrectPassword', (message) => {
      errorMessage.value = message;
    });

    socket.on('noRoom', (message) => {
      errorMessage.value = message;
    });
  } else {
    errorMessage.value = 'Please enter a room code and password.';
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
    <input v-model="password" type="password" placeholder="Enter Room Password" />
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
