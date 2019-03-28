lodash = require("lodash");

posts = []

module.exports= {
  getAll: function(cb) {
    cb(null, lodash.cloneDeep(posts)); // This will save you many a headache - always clone resources your're returning
  }
}
