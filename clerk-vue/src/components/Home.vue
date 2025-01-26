
<script setup lang="ts">
import { useUser } from '@clerk/vue'

const { user, isSignedIn, signOut } = useUser()
</script>

<template>
  <div v-if="isSignedIn">
    <h1>Welcome, {{ user?.fullName }}!</h1>
    <h2>Welcome to the Home Page!</h2>
    <button @click="this.$router.push('/game-room')" class="create-game-btn">Create Game Room</button>
  </div>
  <div v-else>
    <h1>Drawing</h1>
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
