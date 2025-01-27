<template>
  <div>
    <h1>Welcome to Room {{ roomCode }}</h1>
    <p>Players in this room:</p>
    <ul>
      <li v-for="player in players" :key="player">{{ player }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      roomCode: this.$route.params.roomCode,
      roomName: '',
      players: [],
    };
  },
  mounted() {
    this.fetchRoomDetails();
  },
  methods: {
    fetchRoomDetails() {
    },
  },
};
</script>
