<script>
export default {
    props: ['message'],
    data() {
        return {
            messages: []
        }
    },
    beforeUpdate() {
        this.addMessage(this.message)
    },
    methods: {
        addMessage(msg) {
            this.messages.push({ message: msg.message, sender: msg.sender, recipient: msg.recipient, fromMe: msg.fromMe })
        }
    }
}
</script>

<template>
    <section>
        <ul ref="uolist">
            <li v-for="m of messages" :class="{ sent: m.fromMe, recieved: !m.fromMe }">
                <div>{{ m.sender }}: </div>
                <span>
                    {{ m.message }}
                </span>
            </li>
        </ul>
    </section>
</template>

<style scoped>
section {
    width: 70%;
    background-color: #fff;
    padding: 1rem;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-top: 1rem;
}

li>span {
    max-width: 50%;
    display: inline-block;
    padding: 0.5rem;
    text-align: left;
    overflow-wrap: break-word;
    border-radius: 0.5rem;
}

.sent {
    text-align: right;
}

.sent>span {
    background: cornflowerblue;
    color: #fff;
}

.recieved>span {
    background: #efefef;
}

.recieved {
    text-align: left;
}
</style>