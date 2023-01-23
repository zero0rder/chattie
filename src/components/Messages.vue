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
            this.messages.push({ message: msg.message, sender: msg.sender })
        }
    },

}
</script>

<template>
    <section>
        <ul ref="uolist">
            <li v-for="m of messages">
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

ul li:nth-child(odd) {
    text-align: left;
}

li:nth-child(odd)>span {
    background: #efefef;
}

ul li:nth-child(even) {
    text-align: right;
}

li:nth-child(even)>span {
    background: cornflowerblue;
    color: #fff
}

li>span {
    max-width: 50%;
    display: inline-block;
    padding: 0.5rem;
    text-align: left;
    overflow-wrap: break-word;
    border-radius: 0.5rem;
}
</style>