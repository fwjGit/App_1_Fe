import { defineStore } from 'pinia'
import { createWebSocket } from '@/utils/tool'
import { reactive, ref } from 'vue'
import { host, port } from '@/utils/utils'
import { useDetailStore } from '@/stores/detail'

export const useChatStore = defineStore('chat', () => {
  const detailStore = useDetailStore()
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
      currentPersons.value = length as number
      return
    }
    chatContent.push({ type: 'res', text: msg, userName: userName as string })
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
  const postChatText = async (value: string) => {
    if (socket.value) {
      await socket.value.send(value)
      chatContent.push({ type: 'req', text: value, userName: detailStore.userName })
    }
  }

  return {
    chatContent,
    socket,
    currentPersons,
    joinChatRoom,
    postChatText,
  }
})
