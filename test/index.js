// Test file for mocha
var assert = require("assert");
var request = require("supertest");
var app = require("../app");
var Post = require("../models/post");

const NONEXISTING_ID = 1337;
const expectedPostKeys = [
  'title',
  'content',
  'author',
  'post-date',
  'tags',
  'id',
];
const testPost1 = {
  title: "foo title",
  content: "bar content",
  author: "baz author",
  tags: ['foo-tag', 'bar-tag']
};

function validateWellFormattedPost(post) {
  for(key of expectedPostKeys) {
    if(!(key in post)) throw new Error('Missing key ' + key);
  }
}

function validateEqualTags(tags, origTags) {
  if(tags.length !== origTags.length) throw new Error("Tags not of same length");
  for(var tag of tags) {
    if(origTags.indexOf(tag) === -1) {
      throw new Error("New tag: " + tag);
    }
  }
  for(var tag of origTags) {
    if(tags.indexOf(tag) === -1) {
      throw new Error("Missing tag: " + tag);
    }
  }
}

function validateEqualValues(post, original) {
  if(post.title !== original.title) throw new Error("Incorrect title");
  if(post.content !== original.content) throw new Error("Incorrect content");
  if(post.author !== original.author) throw new Error("Incorrect author");
  validateEqualTags(post.tags, original.tags);
}

before(function(done) {
    Post.deleteAll(done);
});

var printOnError = done => (err, res) => {
  if(err) {
    if(res.body) console.log(res.body);
    if(res.error) console.log(res.error);
  }
  done(err, res);
}

describe("getAllPosts", function() {
  context("With no posts", function () {
    it("Returns a well-formatted empty response.", function(done) {
      request(app)
        .get("/api/")
        .expect(200)
        .expect({"posts": []})
        .end(done);
    });
  });

  context("With one post existing", function() {
    var createdPost;
    before(function(done) {
      Post.create(testPost1, (err, result) => {
        createdPost = result;
        done(err);
      });
    });

    it("Returns one well-formatted post.", function(done) {
      request(app)
        .get("/api/")
        .expect(200)
        .expect(res => {
          if(res.body.posts.length !== 1) throw new Error(res.body.posts);
          validateWellFormattedPost(res.body.posts[0]);
        })
        .end(printOnError(done));
    });
  });
});

describe("getPost", function() {
  context("With one post existing", function() {
    var createdPost = null;

    before(function(done) {
      Post.create(testPost1, function(err, post) {
        createdPost = post;
        done(err);
      });
    });

    it("Returns the correct post when queried", function(done) {
      request(app)
        .get("/api/post/" + createdPost.id)
        .expect(200)
        .expect(res => {res.post = res.body.post;})
        .expect(res => validateWellFormattedPost(res.post))
        .expect(res => validateEqualValues(res.post, createdPost))
        .end(printOnError(done));
    });

    it("Returns an empty body when the post does not exist", function(done) {
      request(app)
      .get("/api/post/" + NONEXISTING_ID)
      .expect(404)
      .end(printOnError(done));
    });
  });
});

