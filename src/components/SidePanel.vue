<script>
export default {
    props: ['connections', 'myRoom'],
    emits: ['joinRoom', 'leaveRoom', 'getConnections'],
    data() {
        return {
            isActive: null
        }
    },
    methods: {
        joinRoom(rm) {
            this.$emit('joinRoom', rm)
            this.isActive = rm
        },
        leaveRoom(rm) {
            this.$emit('leaveRoom', rm)
        },
        getConnections() {
            this.$emit('getConnections')
        }
    },
    watch: {
        connections: function (curr) {
            if (curr.length === 0)
                window.alert('Try opening more tabs to create contacts to add...')
        }
    }

}
</script>

<template>
    <section>
        <div class='header'>
            <div class='user'><b>User:</b> {{ myRoom ?? 'loading...' }}</div>
            <span>Contacts</span>
            <button @click.prevent="getConnections">Add Contacts</button>
        </div>
        <div @click="joinRoom(c)" :class="{ active: isActive === c }" class='connection' v-for="c of connections"
            :key="c">
            <div class='conn-info'>
                <span class='conn-avatar'></span>
                <span class='conn-name'>{{ c }}</span>
            </div>
            <!-- <p class='last-msg'>{{ recent[0].text }}</p> -->
        </div>
    </section>
</template>

<style scoped>
section {
    width: 30%;
    background-color: #fff;
    padding: 1rem 0;
    background-color: cadetblue;
}

.user {
    font-size: 0.65rem;
    background-color: darkorange;
    padding: 0.25rem;
    border-radius: 0.25rem;
}

.user>b {
    font-weight: bold;
}

.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 0.75rem;
    border-bottom: 1px solid;
}

.header>span {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.header>button {
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    border: none;
    outline: none;
    cursor: pointer;
}

.connection {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #fff;
    cursor: pointer;
}

.conn-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.conn-avatar {
    width: 1.75rem;
    height: 1.75rem;
    display: inline-block;
    border-radius: 50%;
    background-color: cornflowerblue;
}

.conn-name {
    font-size: 1rem;
    font-weight: 500;
}

.last-msg {
    font-size: 0.7rem;
    font-style: italic;
    padding: 0.25rem;
    color: darkgrey;
}

.active {
    background-color: darkorange;
    color: #fff;
}
</style>