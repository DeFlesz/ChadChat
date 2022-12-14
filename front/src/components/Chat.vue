<script lang="ts" setup>

import {defineComponent, onMounted, ref, watch} from "vue";
import Chatbubble from "./Chatbubble.vue";
import { io } from "socket.io-client";

const prop = defineProps({
  username: String,
  server: String
})

const socket = io(prop.server!, { query: {username: prop.username}, transports : ['websocket']})

try {
  socket.connect()
}
catch (e) {
  console.log(e)
}

const receivedMessages = ref<Array<{
  username: string,
  msg: string,
  me: boolean,
  info: string | null
  private: boolean,
  isMessage: boolean
}>>([])

const dmUsers  = ref<string[]>(["all"])
const currentUser = ref<string>("all");

socket.on("user connected", (username) => {
  receivedMessages.value.push({username:"", msg:`${username} has connected`, me:false, info: null, private: false, isMessage: false})
})

socket.on("user disconnected", (username) => {
  receivedMessages.value.push({username:"", msg:`${username} has disconnected`, me:false, info: null, private: false, isMessage: false})
})

socket.on("chat message", (username, msg) => {
  receivedMessages.value.push({username:username, msg:msg, me:false, info: null, private: false, isMessage: true})
})

socket.on("private chat message", (username, msg, to) => {
    // only client side protection from receiving private message - yikes
    if (prop.username! != to) { return } 
  receivedMessages.value.push({username:username, msg:msg, me:false, info: null, private: true, isMessage: true})
})

function messageSubmit(ev : Event) {
  ev.preventDefault()

  if (message.value != "") {
    try {
      if (currentUser.value != "all") {
        socket.emit("private chat message", message.value, currentUser.value)
      } else {
        socket.emit("chat message", message.value)
      }
    } catch(e) {
      console.log(e);
    } finally {
      receivedMessages.value.push({username: prop.username!, msg:message.value, me:true, info: null, private: false, isMessage: true})
      message.value = ""
    }
  }
}

const messages  = ref<HTMLDivElement | null>(null)
const message = ref("");

onMounted(() => {
  const obs = new MutationObserver(observer);
  obs.observe(messages.value!, {attributes: true, subtree: true, childList: true})
})

let userTypingEventSent = false
const userTyping = ref("")

socket.on("users typing", (msg : string[]) => {
  console.table(msg)
  if (msg.length > 0) {
    let resultArr = msg.filter(element => element != prop.username!)

    userTyping.value = (resultArr.length > 0) ? stringArrayToString(resultArr) : ""
  }
  else {
    userTyping.value = ""
  }
})

function stringArrayToString(message : string[]) {
  console.log(message)
  if (message.length > 3) {
    return "Many users are typing..."
  }

  return message.join(", ") + ` ${message.length > 1 ? "are" : "is" } typing...`
}

watch(message, () => {
  try {
    if (message.value == "") {
      socket.emit("user not typing")
      console.log("sent not typing event")
      userTypingEventSent = false
    }
    else if(!userTypingEventSent)  {
      socket.emit("user typing")
      console.log("sent typing event")
      userTypingEventSent = true
    }
  }
  catch (e) {
    console.log(e)
  }
})

function observer() {
  messages.value!.scroll(0, messages.value!.scrollHeight)
}

socket.on("user disconnected", (username) => {
  if (currentUser == username) {
    currentUser.value = "all"
  }
})

socket.on("user list update", (msg: string[]) => {
  dmUsers.value = msg.filter(v => v !== prop.username!)
  console.log(dmUsers);

})

function setCurrentUser(user : string) {
  currentUser.value = user;

  // I think that private messaging should work more as whisper does in minecraft
  // receivedMessages.value = []
}


</script>

<template>
  <div class="chat">
    <div ref="messages" class="messages">
      <Chatbubble v-for="item in receivedMessages" :me="item.me" :message="item.msg" :user="item.username" :priv="item.private" :is-message="item.isMessage"></Chatbubble>
      <div class="typing">{{userTyping}}</div>
    </div>
    <div class="input">
      <form @submit="messageSubmit">
        <it-input v-model="message" type="text" placeholder="Aa"></it-input>
        <it-button type="primary" size="big" round>send</it-button>
      </form>
    </div>
  </div>
  <div class="userList">
    <div v-for="user in dmUsers" class="user" :class="{userCurrent : currentUser == user}" @click="setCurrentUser(user)">
      {{user}}
    </div>

  </div>
</template>



<style scoped>

  .chat {
    width: 100%;
    max-height: 600px;
    border-radius: 12px;
    height: 100%;
    aspect-ratio: 1.3 / 1.5;
    max-width: 500px;
    border: 1px solid ;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chat > div {
    /* width: 100%; */
  }
  .messages {
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    /*padding-bottom: 20px;*/
    position: relative;
  }

  .messages {
    height: 100%;
  }

  .input {
    border-radius: 12px;
    height: 15%;
    background-color: lightcyan;
    padding-inline: 10px;
    align-items: center;
    display: flex;
  }

  .input form {
    justify-content: space-around;
    align-items: center;
    display: flex;
    width: 100%;
  }
  .typing {
    font-style: italic;
    color: gray;
    position: sticky;
    left: 2px;
    margin-left: 10px;
    bottom: 1px;
    /* margin-leftin: 0; <- what was that? */
  }
  .user {
    cursor: pointer;
  }

  .userCurrent {
    font-weight: bold;
  }

</style>