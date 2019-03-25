var fs = require('fs');
var http = require('http');
var server = http.createServer();

const PORT = 3000;

server.on('request', (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Hello World!");
  response.end();
});

server.listen(PORT, () => {
  console.log("Started listening on port " + PORT);
});
