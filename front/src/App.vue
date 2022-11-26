<script setup lang="ts">
import Chat from './components/Chat.vue'
import {ref} from "vue";


const username = ref("")
const server = ref("")
const usernameAdded = ref(false)



function subUsername(e : Event) {
  e.preventDefault()
  if (username.value != "" && server.value != "") usernameAdded.value= true
}


</script>


<template>
  <div class="wrapper">
    <div class="username" v-if="!usernameAdded">
      <form @submit="subUsername">
        <it-input placeholder="username" v-model="username" required></it-input>
        <it-input placeholder="server" v-model="server" required></it-input>
        <it-button type="primary" size="small">Submit</it-button>
      </form>

    </div>
    <Chat v-if="usernameAdded" :username="username" :server="server"></Chat>
  </div>



</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
}

form {
  height: fit-content;
  display: flex;
  background-color: white;
  padding: 20px;
  gap: 10px;
  border-radius: 12px;

}

.username {
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000cc;
}
</style>
