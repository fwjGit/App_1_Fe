<template>
  <div class="message" v-if="isShowDescription">
    <slot name="description"></slot>
  </div>
  <div class="chatBox" v-if="isShowChatBox">
    <div class="box">
      <List :data="chatContent">
        <template #content="{ listItem }">
          <ChatText :data="listItem" />
        </template>
      </List>
    </div>
    <div class="inputBox">
      <a-input v-model:value="chatText" placeholder="请输入内容" allow-clear />
      <a-button type="primary" class="button" @click="postText" :disabled="chatText.length === 0"
        >发送</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import List from '@/components/list.vue'
import ChatText from '@/components/ChatText.vue'
import { ref } from 'vue'

const props = defineProps<{
  isShowDescription: boolean
  isShowChatBox: boolean
  chatContent: { type: string; text: string; userName: string }[]
  postChatText: (value: string) => void
}>()

const chatText = ref<string>('')

const postText = () => {
  props.postChatText(chatText.value)
  chatText.value = ''
}
</script>

<style scoped>
.message {
  flex: 1 0 200px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.chatBox {
  min-height: 400px;
  max-height: 500px;
  flex: 2 1 400px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 40px;
  grid-gap: 10px 0;
  padding: 10px 0px;
}
.box {
  overflow-y: auto;
  border: 1px solid grey;
}
.inputBox {
  grid-row: 2/3;
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: auto 50px;
  grid-template-rows: 1fr;
  grid-gap: 0 10px;
}

.button {
  align-self: center;
}
</style>
