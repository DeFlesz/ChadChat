<script lang="ts" setup>

import {defineComponent} from "vue";
import Chatbubble from "./Chatbubble.vue";



function messageSubmit(ev : Event) {
  ev.preventDefault()


}


</script>

<template>
  <div class="chat">
    <div class="messages">
      <Chatbubble me message="Damn wtf what is hadafsdsaf adfsgh afsghd a fppenni" user="me"></Chatbubble>
      <Chatbubble  message="Your mom happening" user="hater"></Chatbubble>
      <Chatbubble  message="Nienawidze was" user="jakiś fucker"></Chatbubble>
      <Chatbubble me message="Jestem kurwa sexy" user="me"></Chatbubble>
      <Chatbubble me message="ZAjebisty normalnie jakiś nie wiem co powiedzieć szczerze, jestem sam sobą zaskoczony jak fajny ja jestem jeez no normalnie kocham sie" user="me"></Chatbubble>
      <Chatbubble me message="Damn wtf what is hadafsdsaf adfsgh afsghd a fppenni" user="me"></Chatbubble>
      <Chatbubble  message="Your mom happening" user="hater"></Chatbubble>
      <Chatbubble  message="Nienawidze was" user="jakiś fucker"></Chatbubble>
      <Chatbubble me message="Jestem kurwa sexy" user="me"></Chatbubble>
      <Chatbubble me message="ZAjebisty normalnie jakiś nie wiem co powiedzieć szczerze, jestem sam sobą zaskoczony jak fajny ja jestem jeez no normalnie kocham sie" user="me"></Chatbubble>
      <Chatbubble me message="Damn wtf what is hadafsdsaf adfsgh afsghd a fppenni" user="me"></Chatbubble>
      <Chatbubble  message="Your mom happening" user="hater"></Chatbubble>
      <Chatbubble  message="Nienawidze was" user="jakiś fucker"></Chatbubble>
      <Chatbubble me message="Jestem kurwa sexy" user="me"></Chatbubble>
      <Chatbubble me message="ZAjebisty normalnie jakiś nie wiem co powiedzieć szczerze, jestem sam sobą zaskoczony jak fajny ja jestem jeez no normalnie kocham sie" user="me"></Chatbubble>


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