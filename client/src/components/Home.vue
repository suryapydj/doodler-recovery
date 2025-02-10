<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '@clerk/vue';
import { useRouter } from 'vue-router';
import { useSocket } from '../socket.ts';

const { user, isSignedIn } = useUser();
const router = useRouter();
const socket = useSocket();

const errorMessage = ref('');
/*
const joinRoom = () => {
  if (roomCode.value) {
    socket.emit('joinRoom', { roomCode: roomCode.value });
    socket.on('joinedRoom', () => {
      router.push(`/game-room/${roomCode.value}`);
    });

    socket.on('roomJoinError', (message) => {
      errorMessage.value = message;
    });
  } else {
    errorMessage.value = 'no rc';
  }
};*/

const navigateToCreateRoom = () => {
  router.push('/create');
};

const navigateToJoinRoom = () => {
  router.push('/join')
}

</script>

<template>
  <div v-if="isSignedIn">
    <h1>Welcome, {{ user?.fullName }}!</h1>
    <button @click="navigateToJoinRoom">Join Game Room</button>
    <button @click="navigateToCreateRoom">Create Game Room</button>
  </div>
  <div v-else>
    <h1>shouldnt happen</h1>
  </div>
</template>

<style scoped>
button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #2283f3;
}
</style>
