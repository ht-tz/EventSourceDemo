/*
 * @Author: htz
 * @Date: 2024-06-26 00:26:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-26 00:48:16
 * @Description: SSE demo
 */
const express = require('express')
const app = express()

app.use(express.static('public'))

// SSE技术点。
// 1. 设置响应头，指定Content-Type为text/event-stream
// 2. 设置响应头，指定Cache-Control为no-cache
// 3. 设置响应头，指定Connection为keep-alive
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  //  1秒钟发送一次消息
  const intervalId = setInterval(() => {
    const data = { message: `Current time: ${new Date().toLocaleTimeString()}` }
    sendEvent(data)
  }, 1000)

  // 当客户端关闭连接时，清除定时器
  req.on('close', () => {
    clearInterval(intervalId)
    res.end()
  })
})
const port = 5500
app.listen(port, () => {
  console.log('server is running at port 5500')
})
