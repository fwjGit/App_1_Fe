class Schedule {
  readonly maxRequestCount: number // 最大请求数
  requestPool: Array<() => Promise<void>> // 请求池
  currentReqCount: number //当前请求数量

  // 默认最多 6 个请求
  constructor(maxRequestCount: number = 6) {
    this.maxRequestCount = maxRequestCount
    this.requestPool = []
    this.currentReqCount = 0
  }

  // 加入请求任务
  add(promiseCB: () => Promise<void>) {
    this.requestPool.push(promiseCB)
    this.run()
  }

  // 执行请求
  run() {
    try {
      // 请求池不为空，且当前请求数未超过最大请求数时执行新请求
      if (this.requestPool.length > 0 && this.currentReqCount < this.maxRequestCount) {
        const promise: () => Promise<void> = this.requestPool.shift() as () => Promise<void>
        this.currentReqCount++
        promise()
          .then((res) => {
            console.log(res)
            this.currentReqCount--
            this.run()
          })
          .catch((error) => {
            console.error(error)
          })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

const scheduler = new Schedule(6)

export default scheduler
