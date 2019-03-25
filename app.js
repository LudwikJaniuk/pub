var fs = require('fs');
var http = require('http');
var server = http.createServer();
var reader = require('./file-reader');
var str = require('./string-util');

const PORT = 3000;

server.on('request', (request, response) => {
  reader.read((err, contents) => {
    if(err) {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write('Server error');
      response.end();
      return;
    }
    
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(contents);
    response.end();
  });
});

server.listen(PORT, () => {
  console.log('Started listening on port ' + PORT);
});
