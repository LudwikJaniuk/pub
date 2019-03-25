var fs = require('fs');

function getFile(callback) {
  fs.readFile('DATA', 'utf8', callback);
}

module.exports = {
  read: getFile
}
