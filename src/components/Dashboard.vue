<script setup>
import { io } from 'socket.io-client'
import { ref } from 'vue'
import Messages from './Messages.vue'
import SidePanel from './SidePanel.vue'
import Input from './Input.vue'
const socket = io(import.meta.env.VITE_SERVER_URL, {})

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

function sendMsgToServer({ message }) {
  socket.emit('chatMessage', { sender: myRoom.value, message, recipient: roomId.value })
}

function joinRoom(room) {
  socket.emit('joinRoom', room, res => roomId.value = res)
}

function leaveRoom(room) {
  socket.emit('leaveRoom', room, res => roomId.value = res)
}

let msgData = ref()
socket.on('chatMessage', (res) => {
  msgData.value = {
    sender: res.sender,
    message: res.message,
    recipient: res.recipient,
    fromMe: res.sender === myRoom.value
  }
});
</script>

<template>
  <main class='dashboard-main'>
    <div class='msg-panel-wrapper'>
      <SidePanel :connections="connections" @join-room="joinRoom" @leave-room="leaveRoom"
        @get-connections="getConnections" :my-room="myRoom" />
      <Messages :message="msgData" />
    </div>
    <Input @input-submit="sendMsgToServer" :my-room="myRoom" />
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