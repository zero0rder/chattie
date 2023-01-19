<script>
export default {
  data(){
    return { message: '' }
  },
  methods: {
    handleSubmit(){
      this.$emit('inputSubmit', this.message)      
      this.message = ''
    }
  }
}
</script>

<template>
  <form @submit.prevent='handleSubmit'>
    <input
      autocomplete="off" 
      v-model='message'
      placeholder="..."/>
    <button type="submit">Send</button>
  </form>
</template>

<style scoped>
  form { 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    height: 10%;
    background-color: cadetblue;
  }

  input {
    width: 70%;
    font-size: 1.75rem;
    padding: 0.5rem 1rem;
  }

  button {
    width: 28%;
    font-size: 1.5rem;
    cursor: pointer;
  }

  input, button {
    height: 3.5rem;
    border-radius: 0.25rem;
    outline: none;
    border: none;
  }
</style>