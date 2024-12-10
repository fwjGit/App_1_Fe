const host = '127.0.0.1'
const port = '7002'
const protocol = { http: 'http', https: 'https' }
const wsPort = '7001'

const url = `${protocol.http}://${host}:${port}`

// AI模型请求网址
const aiUrl = `${protocol.https}://api.chatanywhere.tech`
const apiKey = 'sk-7quOPcZ0JrATKao9YErAyCm7ecpWJogeh8986o0PO7Jsk96O'

const prefix = '/api'

export { url, host, prefix, port, wsPort, aiUrl, apiKey }
