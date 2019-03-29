var express = require('express');
var router = express.Router();
var Post = require("../models/post");

function formatDbPost(dbPost) {
  return {
    'title': dbPost.title,
    content: dbPost.content,
    author: dbPost.author,
    tags: dbPost.tags,
    "post-date": dbPost.postDate,
    id: dbPost.id
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
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

    res.status(200);
    res.send({posts: result});
  })
});

router.get('/post/:id', function(req, res) {
  Post.getOne(req.params.id, (err, result) => {
    if(err) {
      res.status(500);
      res.send("internal error");
      return;
    }

    if(!result) {
      res.status(404);
      res.send("Not found.");
      return;
    }

    res.status(200);
    res.send({post: formatDbPost(result)});
  });
})

module.exports = router;
