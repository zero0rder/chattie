<script setup>
import { io } from 'socket.io-client';
import { ref } from 'vue';
import Messages from './Messages.vue';
import SidePanel from './SidePanel.vue';
import Input from './Input.vue';
const socket = io('http://localhost:8080', {})

let roomId = ref(),
  myRoom = ref(),
  connections = ref([])

socket.on('connect', () => {
  myRoom.value = socket.id
  console.log(`My Room: ${myRoom.value}`)
})

function getConnections() {
  socket.emit('getConnections', null, res => connections.value = res.filter(c => c !== myRoom.value))
}

function sendMsgToServer({ message, sender }) {
  socket.emit('chatMessage', { sender, message, roomId: roomId.value })
}

function joinRoom(room) {
  socket.emit('joinRoom', room, res => roomId.value = res)
}

function leaveRoom(room) {
  socket.emit('leaveRoom', room, res => {
    console.log(`connected clients: ${res}`)
    roomId.value = res
  })
  console.log(`leave rm: ${room}`)
}

let msgData = ref()
socket.on('chatMessage', (res) => {
  msgData.value = {
    sender: res.sender,
    message: res.message,
    roomId: roomId.value
  }
});
</script>

<template>
  <main class='dashboard-main'>
    <div class='msg-panel-wrapper'>
      <SidePanel :connections="connections" @join-room="joinRoom" @leave-room="leaveRoom"
        @get-connections="getConnections" />
      <Messages :message="msgData" />
    </div>
    <Input @input-submit="sendMsgToServer" />
  </main>
</template>

<style scoped>
.dashboard-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.msg-panel-wrapper {
  display: flex;
  gap: 0.2rem;
  height: 90%;
  background-color: lightgray;
}
</style>