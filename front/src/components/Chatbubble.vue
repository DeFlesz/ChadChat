<template>
  <div class="messageWrapper" :class="{ right : me, left : !me, priv: priv }">

    <div v-if="isMessage" class="message">
      {{message}}
      <div v-if="priv" class="user">
        {{user}} prywatnie
      </div>
      <div v-else class="user">
        {{user}}
      </div>
    </div>
    <div v-else class="announcement">
      {{message}}
    </div>
  </div>

</template>

<script lang="ts" setup>


const props = defineProps({
  message : String,
  me : Boolean,
  user : String,
  priv: Boolean,
  isMessage: Boolean
})

</script>

<style scoped>

.messageWrapper {
  display: flex;
  padding: 10px;
}

.message {
  padding: 8px;
  max-width: 48%;
  border-radius: 12px;
  position: relative;

}

.announcement {
  width: 100%;
  text-align: center;
}

.left .message {
  background-color: lightgray;
}

.right .message {
  background-color: aliceblue;
  border: olivedrab 1px solid;

}

.priv .message {
  font-style: italic;
  border: black 1px solid;
  background-color:darkgray;
}

.right {
  justify-content: right;
}

.left {
  justify-content: left;
}
.user {
  position: absolute;
  bottom: -14px;
  font-size: 12px;
}

.priv .user {
  width: max-content;
  position: absolute;
  left: 0;
  bottom: -14px;
  font-size: 12px;
}

.left .user {
  left: 0;
  text-align: right;
}

.right .user {
  right: 0;
  text-align: right;
}

</style>