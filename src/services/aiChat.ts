import request from '../utils/request'
import fetchSSE from '../utils/fetchEventSource'

// // AI聊天发出请求
// export const chatWithAI = function (value: string) {
//   const data: {
//     model: string
//     messages: { role: string; content: string }[]
//     stream?: boolean
//   } = {
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: value }],
//     stream: true, // 开启流式返回
//   }
//   return request({
//     url: '/AI/v1/chat/completions',
//     data,
//     method: 'POST',
//     responseType: 'stream',
//   })
// }

// AI聊天发出请求
export const chatWithAI = function ({
  value,
  onmessage,
  onerror,
}: {
  value: string
  onmessage: (event: any) => void
  onerror: () => void
}) {
  const data: {
    model: string
    messages: { role: string; content: string }[]
    stream?: boolean
  } = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: value }],
    stream: true, // 开启流式返回
  }

  return fetchSSE({
    url: '/AI/v1/chat/completions',
    data,
    onmessage,
    onerror,
  })
}
