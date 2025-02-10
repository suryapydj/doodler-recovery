<template>
    <div>
        <input v-model="roomCode" placeholder="Enter Room Code" />
        <button @click="" :disabled="!roomCode">Join Room</button>
        <button @click="backHome">Back Home</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";

const roomCode = ref('');
const router = useRouter();

const backHome = () => {
  router.push('/');
};
</script>
