// 存储token到浏览器localStorage
export const cacheToken = (token: string, userName: string) => {
  window.localStorage.setItem('token', token)
}

// 清除token
export const removeToken = () => {
  window.localStorage.removeItem('token')
}

// 跨域通过webSocket接受token
export const receiveToken = ({
  callBack,
  host,
  port = '7001',
}: {
  callBack: () => void
  host: string
  port: string
}) => {
  const socket = new WebSocket(`ws://${host}:${port}/detail?socketId=app1${Date.now()}`)
  socket.onopen = () => {
    socket.send('token')
  }
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    localStorage.setItem('token', data.token)
    socket.close()
  }
  socket.onclose = () => {
    callBack()
  }
}

// 预处理路由表数据生成{id:name}
export const generateRouteMap = (
  routes: { id: string; name: string; children?: { id: string; name: string }[] }[],
): { [id: string]: string } => {
  const map: { [id: string]: string } = {}
  routes.forEach((route) => {
    const { name, id, children } = route
    map[id] = name
    if (children) {
      children.forEach((subRoute) => {
        const { name, id } = subRoute
        const key = id.split(',')[1]
        map[key] = name
      })
    }
  })
  return map
}
