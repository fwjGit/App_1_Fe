<template>
  <div class="container">
    <Chat
      :is-show-description="true"
      :is-show-chat-box="chatStore.socket !== null"
      :chat-content="chatStore.chatContent"
      :post-chat-text="chatStore.postChatText"
    >
      <template #description>
        <div class="message">
          <p>聊天室</p>
          <div>当前在线人数：{{ chatStore.currentPersons }}</div>
          <a-button type="primary" @click="chatStore.joinChatRoom">{{
            chatStore.socket ? '退出群聊' : '加入群聊'
          }}</a-button>
        </div>
      </template>
    </Chat>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import Chat from '@/components/Chat.vue'
const chatStore = useChatStore()
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
}
.message {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
