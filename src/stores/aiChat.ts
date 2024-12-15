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

    const onmessage = (event: any) => {
      let data
      try {
        if (event.data === '[DONE]') return

        data = JSON.parse(event.data)
        const { choices } = data

        const { finish_reason, delta } = choices[0]
        if (finish_reason !== 'stop') {
          if (delta.role) {
            chatContent.push({ type: 'res', text: '', userName: delta.role })
          } else {
            const index = chatContent.length - 1
            const content = chatContent[index].text
            chatContent[index].text = content + delta.content
          }
        } else {
          console.log('AI传递完成了')
        }
      } catch (error) {
        console.error(error)
      }
    }
    const onerror = () => {
      console.log('AI出错了')
    }
    await chatWithAI({ value, onmessage, onerror })
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
