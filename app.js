var reader = require("./file-reader");
var str = require("./string-util");

reader.read((err, contents) => {
  if(err) {
    console.log(err);
    return;
  }
  
  console.log(str.reversed(contents));
});


