var net = require('net')
var server = net.createServer()
server.listen(2000, () => {
  console.log('监听端口2000')
})
