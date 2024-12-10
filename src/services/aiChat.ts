import request from '../utils/request'

// AI聊天发出请求
export const chatWithAI = function (value: string) {
  const data: {
    model: string
    messages: { role: string; content: string }[]
  } = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: value }],
  }
  return request.post('/AI/v1/chat/completions', data)
}
