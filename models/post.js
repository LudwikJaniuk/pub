_ = require("lodash");

posts = [];

// Generates a new ID every call. 
// Eploiting closures in Javascript - ask me about this feature!
nextID = function() { var x = 0; return () => {x++; return ""+x;}}()


module.exports= {
  getAll: function(cb) {
    cb(null, _.cloneDeep(posts)); // This will save you many a headache - always clone resources your're returning
  },
  getOne(id, cb) {
    var foundPost = null;
    for(var post of posts) {
      if(post.id == id) {
        foundPost = _.cloneDeep(post);
        break;
      }
    }
    cb(null, foundPost);
  },
  deleteAll: function(cb) {
    posts = [];
    cb(null);
  },
  deleteOne: function(id, cb /* (err, wasDeleted) */) {
    index = _.findIndex(posts, post => post.id === id);
    if(index === -1) cb(null,false);
    else {
      posts.splice(index, 1);
      cb(null, true);
    }
  },
  create: function(postData, cb) {
    tags = [];
    if (postData.tags) {
      for(var tag of postData.tags) {
        if (typeof(tag) !== "string") {
          cb("Invalid tag " + tag);
          return;
        }

        tags.push(tag);
      }
    }

    newPost = {
      title: postData.title,
      content: postData.content,
      author: postData.author,
      tags: tags, 
      postDate: Date(),
      id: nextID(),
    }

    posts.push(newPost);
    cb(null, _.cloneDeep(newPost));
  }
}
