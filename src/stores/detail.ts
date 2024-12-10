import { defineStore } from 'pinia'
import { logout, getRoutes, queryUserName } from '@/services/detail'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/tool'
import { ref } from 'vue'
import scheduler from '@/utils/requestSchedule'

export const useDetailStore = defineStore('detail', () => {
  const router = useRouter()
  const userName = ref('')
  let routeMessage = ref([])

  const logoutAction = async () => {
    let result: { code?: number; data?: any } = await logout()
    if (result?.code && result?.code === 200) {
      removeToken()
      router.push({ path: '/login' })
    } else {
      alert('退出失败，请重试')
    }
  }

  const queryUserNameAction = async () => {
    let result: { code?: number; data?: any; msg?: string } = await queryUserName()
    if (result?.code && result?.code === 200) {
      userName.value = result.data.userName
    } else {
      alert(result.msg)
    }
  }

  const queryRouteMessageAction = async () => {
    let result: { code?: number; data?: any; msg?: string } = await getRoutes()
    if (result?.code && result?.code === 200) {
      const routes = JSON.parse(result.data.routes)
      routeMessage.value = routes
    } else {
      alert(result.msg)
    }
  }

  const initLoadAction = () => {
    scheduler.add(() => {
      return new Promise((resolve, reject) => {
        queryUserNameAction()
      })
    })
    scheduler.add(() => {
      return new Promise((resolve, reject) => {
        queryRouteMessageAction()
      })
    })
  }

  return { logoutAction, userName, routeMessage, initLoadAction }
})
