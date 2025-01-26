<script setup lang="ts">
import { ref } from 'vue'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'

/*
const isInGameRoom = ref(false) 

const createGameRoom = () => {
  isInGameRoom.value = true 
}

const goHome = () => {
  isInGameRoom.value = false 
}
*/
</script>

<template>
  <div id="app">
    <header>
      <h1>Doodler</h1>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <RouterView />
        <!--
        <div v-if="!isInGameRoom">
          <Home @createRoom="createRoom" />
        </div>

        <div v-else>
          <GameRoom />
          <button @click="goHome">Go Back to Home</button>
        </div>
        -->
      </SignedIn>
    </header>
  </div>
</template>

<style scoped>
#app {
  background-color: lightblue;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

header {
  padding: 20px;
  background-color: #333;
  color: white;
}

h1 {
  margin: 0;
}

main {
  padding: 20px;
}

.create-game-btn {
  background-color: #28a745; 
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.create-game-btn:hover {
  background-color: #218838;
}

.go-home-btn {
  background-color: #007bff; 
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.go-home-btn:hover {
  background-color: #0056b3; 
}
</style>
