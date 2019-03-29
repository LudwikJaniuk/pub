var express = require('express');
var router = express.Router();
var Post = require("../models/post");

function formatDbPost(dbPost) {
  return {
    'title': post.title,
    content: post.content,
    author: post.author,
    tags: post.tags,
    "post-date": post.postDate,
    id: post.id
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Test");
  Post.getAll((err, posts) => {
    if(err) {
      res.status(500);
      res.send("internal error");
      return;
    }

    result = [];

    for(var post of posts) {
      result.push(formatDbPost(post));
    }

    console.log("Test2");
    res.status(200);
    res.send({posts: result});
  })
});

router.get('/post/:id', function(req, res) {
  Post.getOne(req.params.id, (err, result) => {
    if(err) {
      console.log(err);
      res.status(500);
      res.send("internal error");
      return;
    }

    if(!result) {
      console.log(result);
      res.status(404);
      res.send("Not found.");
      return;
    }

    console.log("Got back here");
    res.status(200);
    res.send({post: formatDbPost(result)});
  });
})

module.exports = router;
