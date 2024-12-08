<template>
  <div class="container">
    <div class="message">
      <p>聊天室</p>
      <div>当前在线人数：{{ currentPersons }}</div>
      <a-button type="primary" class="button" @click="joinChatRoom">{{
        socket ? '退出群聊' : '加入群聊'
      }}</a-button>
    </div>
    <div class="chatBox" v-if="socket">
      <div class="box">
        <List :data="chatContent">
          <template #content="{ listItem }">
            <ChatText :data="listItem" />
          </template>
        </List>
      </div>
      <div class="inputBox">
        <a-input v-model:value="chatText" placeholder="请输入内容" allow-clear />
        <a-button
          type="primary"
          class="button"
          @click="postChatText"
          :disabled="chatText.length === 0"
          >发送</a-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { createWebSocket } from '@/utils/tool'
import { host, port } from '@/utils/utils'
import List from '@/components/list.vue'
import { useDetailStore } from '@/stores/detail'
import ChatText from '@/components/ChatText.vue'
const detailStore = useDetailStore()
const chatText = ref<string>('')
const chatContent = reactive<{ type: string; text: string; userName: string }[]>([])
const socket = ref<any>(null)
const currentPersons = ref<number | string>('加入群聊查看')

const receiveResponse = ({
  msg,
  userName,
  length,
}: {
  msg?: string
  userName?: string
  length?: number
}) => {
  if (!msg) {
    currentPersons.value = length
    return
  }
  chatContent.push({ type: 'res', text: msg, userName })
}
// 点击加入群聊触发
const joinChatRoom = () => {
  if (socket.value) {
    socket.value.close()
    socket.value = null
    currentPersons.value = '加入群聊查看'
    return
  }
  socket.value = createWebSocket({ host, port, callBack: receiveResponse })
}

// 发送消息
const postChatText = () => {
  if (socket.value) {
    socket.value.send(chatText.value)
    chatContent.push({ type: 'req', text: chatText.value, userName: detailStore.userName })
    chatText.value = ''
  }
}
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

.chatBox {
  flex: 2;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 20px;
  grid-gap: 10px 0;
  padding: 10px 0px;
}
.box {
  grid-row: 1/2;
  width: 100%;
  height: 100%;
  border: 1px solid grey;
}
.inputBox {
  grid-row: 2/3;
  width: 100%;
  height: 20px;
  display: grid;
  grid-template-columns: auto 50px;
  grid-template-rows: 1fr;
  grid-gap: 0 10px;
}
</style>
