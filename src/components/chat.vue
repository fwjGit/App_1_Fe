<template>
  <div class="message" v-if="isShowDescription">
    <slot name="description"></slot>
  </div>
  <div class="chatBox" v-if="isShowChatBox">
    <div class="box" ref="scrollElement">
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
import { ref, watch, reactive } from 'vue'

const props = defineProps<{
  isShowDescription: boolean
  isShowChatBox: boolean
  chatContent: { type: string; text: string; userName: string }[]
  postChatText: (value: string) => void
}>()

const chatText = ref<string>('')
const scrollElement = ref<HTMLElement | null>(null)
const chat = reactive(props.chatContent)

const postText = () => {
  props.postChatText(chatText.value)
  chatText.value = ''
}

// 聊天框内容触底时自动下拉
const onScroll = (e: HTMLElement | null) => {
  if (!e) return
  e.scrollTop = e.scrollHeight
}

watch([() => chat.length, () => chat[chat.length - 1]?.text], (newVal) => {
  onScroll(scrollElement.value)
})
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
  flex: 1 1 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 10px 0px;
}
.box {
  min-height: 200px;
  max-height: 350px;
  height: 100%;
  overflow-y: auto;
  border: 1px solid grey;
}
.inputBox {
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
