<template>
  <div class="container">
    <Chat
      :is-show-description="true"
      :is-show-chat-box="true"
      :chat-content="aiChatStore.chatContent"
      :post-chat-text="aiChatStore.postChatText"
    >
      <template #description>
        <div class="message">
          <h3 class="title">AI Chat</h3>
          <div>gpt-3.5-turbo模型</div>
        </div>
      </template>
    </Chat>
  </div>
</template>

<script setup lang="ts">
import { useAIChatStore } from '@/stores/aiChat'
import Chat from '@/components/Chat.vue'
const aiChatStore = useAIChatStore()
</script>

<style scoped>
.container {
  min-height: 400px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
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

.title {
  font-size: 1.3rem;
}
</style>
