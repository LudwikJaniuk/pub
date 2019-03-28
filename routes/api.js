var express = require('express');
var router = express.Router();
var Post = require("../models/post");

/* GET home page. */
router.get('/', function(req, res, next) {
  // BAD DOG: res.send({posts: []});

  Post.getAll((err, posts) => {
    if(err) {
      console.log(error);
      res.status(500);
      res.send("internal error");
      return;
    }

    result = [];

    res.status(200);
    res.send({posts: result});
  })
});

module.exports = router;
