<template>
  <div class="messageWrapper" :class="{ right : me, left : !me }">

    <div class="message">
      {{message}}
      <div class="user">
        {{user}}
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>


const props = defineProps({
  message : String,
  me : Boolean,
  user : String
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

.left .message {
  background-color: lightgray;
}

.right .message {
  background-color: aliceblue;
  border: olivedrab 1px solid;

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

.left .user {
  right: 0;
  text-align: right;
}



</style>