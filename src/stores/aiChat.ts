import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useDetailStore } from '@/stores/detail'
import { chatWithAI } from '@/services/aiChat'
import scheduler from '@/utils/requestSchedule'

export const useAIChatStore = defineStore('aiChat', () => {
  const detailStore = useDetailStore()
  const chatContent = reactive<{ type: string; text: string; userName: string }[]>([])

  // 发送消息
  const postText = async (value: string) => {
    chatContent.push({ type: 'req', text: value, userName: detailStore.userName })

    let { choices }: { choices: any[]; [key: string]: any } = (await chatWithAI(value)) as any

    if (choices.length > 0) {
      const { finish_reason, message } = choices[0]
      if (finish_reason === 'stop') {
        chatContent.push({ type: 'res', text: message.content, userName: message.role })
      } else {
        console.log('AI程序出现意外了')
      }
    } else {
      alert('AI请求出错了')
    }
  }

  const postChatText = (value: string) => {
    scheduler.add(() => {
      return new Promise((resolve, reject) => {
        postText(value)
      })
    })
  }

  return {
    chatContent,
    postChatText,
  }
})
