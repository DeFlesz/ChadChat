<script lang="ts" setup>

import {defineComponent, onMounted, ref} from "vue";
import Chatbubble from "./Chatbubble.vue";



function messageSubmit(ev : Event) {
  ev.preventDefault()
  testAdd()
}

const testArr = ref([0, 1, 2, 3])

function slotChange(ev : Event) {
  console.log("damn")
}

function testAdd() {
  testArr.value.push(1)
}

const messages  = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const obs = new MutationObserver(observer);
  obs.observe(messages.value!, {attributes: true, subtree: true, childList: true})
})


function observer() {
  messages.value!.scroll(0, messages.value!.scrollHeight)

}


</script>

<template>
  <div class="chat">
    <div ref="messages" class="messages" @slotchange="slotChange" >

      <Chatbubble v-for="item in testArr" me message="Damn wtf what is hadafsdsaf adfsgh afsghd a fppenni" user="me"></Chatbubble>
    </div>
    <div class="input">
      <form @submit="messageSubmit">
        <it-input type="text" placeholder="Aa"></it-input>
        <it-button type="primary" size="big" round>send</it-button>
      </form>
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
    width: 100%;
  }
  .messages {
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    padding-bottom: 20px;
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

</style>