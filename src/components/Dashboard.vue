<script setup>
import { io } from 'socket.io-client';
import { ref } from 'vue';
import Messages from './Messages.vue';
import SidePanel from './SidePanel.vue';
import Input from './Input.vue';
const socket = io('http://localhost:8080', {})

let newMsg = ref('')
function sendMsgToServer(msg){
  socket.emit('chat message', msg);
  socket.on('chat message', (res) => newMsg.value = res);
}
</script>

<template>
  <main class='dashboard-main'>
    <div class='msg-panel-wrapper'>
        <SidePanel/>
        <Messages :message="newMsg" />
    </div>
    <Input @input-submit="sendMsgToServer"/>
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