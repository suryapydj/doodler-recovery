


<template>
  <div class="game-room">
    <h2>Game Room: {{ roomName }}</h2>
    <p>Start</p>
    <input v-model="message" placeholder="Type a message" />
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
.game-room {
  padding: 20px;
  background-color: #f8f9fa;
}

h2 {
  color: #007bff;
}
</style>
