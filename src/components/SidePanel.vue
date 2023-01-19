<script>
export default {
    data(){
        return {
            connections: [
                { name: 'Jane Sandy', avatar: '', id: 0 },
                { name: 'Peter Bergman', avatar: '', id: 1 },
                { name: 'Tina Dean', avatar: '', id: 2 },
                { name: 'Ben Franklin', avatar: '', id: 3 },
                { name: 'Vahan Sewder', avatar: '', id: 4 },
            ],
            recent: [
                { id: 0, text:'Sure. Just text me when you ready' }
            ]
        }
    }
}
</script>

<template>
    <section>
        <div class='header'>
            <span>Contacts</span>
        </div>
        <div class='connection' v-for="c of connections" :key="c.id"> <!-- turn into component, pass down props -->
            <div class='conn-info'>
                <span class='conn-avatar'>{{ c.avatar }}</span>
                <span class='conn-name'>{{ c.name }}</span>
            </div>
            <p class='last-msg'>{{ recent[0].text }}</p>
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

    .header {
        text-align: center;
        margin: 0 0 0.75rem;
    }

    .header > span {
        font-size: 1.5rem;
    }

    .connection {
        margin-top: 0.5rem;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid;
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
        font-size: 1.25rem;
        font-weight: 500;
    }

    .last-msg {
        font-size: 0.7rem;
        font-style: italic;
        padding: 0.25rem;
        color: darkgrey;
    }
</style>