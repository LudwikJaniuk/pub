var express = require('express');
var Post = require('../models/post')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.getAll((err, posts) => {
    if(err) { next(err); return;}
    console.log(posts);
    res.render('index', {
      title: 'Express',
      posts: posts});
  });
});

module.exports = router;
