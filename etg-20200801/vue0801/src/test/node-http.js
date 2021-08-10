var http = require('http')
var fs = reauire('fs')
var server = new http.Server()
server.listen(8000)

server.on('request', (req, res) => {
  //解析请求的URL
  var url = require('url').parse(req.url)
})
