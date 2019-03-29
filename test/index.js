// Test file for mocha
var _ = require("lodash");
var async = require("async");
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

const testPost2 = {
  title: "foo titl2",
  content: "bar content2",
  author: "baz author2",
  tags: ['foo-tag2', 'bar-tag2']
};

function validateWellFormattedPost(post) {
  for(key of expectedPostKeys) {
    if(!(key in post)) throw new Error('Missing key ' + key);
  }
}

function isSameTags(tags1, tags2) {
  return tags1.length === tags2.length && _.isEmpty(_.xor(tags1, tags2));
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

function ensurePostExistsInDB(post, cb) {
  Post.getAll((err, posts) =>{
    if(err) {cb(err); return;}
    for(var dbPost of posts) {
      if(
        dbPost.title === post.title &&
        dbPost.content === post.content &&
        dbPost.author === post.author &&
        isSameTags(dbPost.tags, post.tags)
      ) {
        cb(null, dbPost.id);
        return;
      }
    }

    cb(new Error("Post not found!"));
  })
}

beforeEach(function(done) {
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
    beforeEach(function(done) {
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

    beforeEach(function(done) {
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

describe("createPost", function() {
  context("With no posts existing", function() {
    var createdPost = null;

    it("Creates the post in the database", function(done) {
      request(app)
      .post("/api/")
      .send(testPost1)
      .expect(200)
      .expect(res => {
        if(!typeof(res.body.id) === "string") throw new Error("Id is not a string");
      })
      .end((err, res)=> {
        if(err) {
          printOnError(done)(err, res);
        }
        ensurePostExistsInDB(testPost1, (err, id) => printOnError(done)(err, res));
      });
    });

    it("Returns matching ID", function(done) {
      request(app)
      .post("/api/")
      .send(testPost1)
      .expect(200)
      .expect(res => {
        if(!typeof(res.body.id) === "string") throw new Error("Id is not a string");
      })
      .end((err, res)=> {
        if(err) {
          printOnError(done)(err, res);
        }
        ensurePostExistsInDB(testPost1, (err, id) => {
          if(err) {
            printOnError(done)(err, res);
            return;
          }

          if(id !== res.body.id) {
            err = new Error("Id does not match");
          }
          printOnError(done)(err, res);
        })
      });
    });
  });
});

describe("deletePost", function() {
  context("With one post existing, deleting it", function() {
    var createdPost = null;

    beforeEach(function(done) {
      Post.create(testPost1, function(err, post) {
        createdPost = post;
        done(err);
      });
    });

    it("succeeds", function(done) {
      request(app)
      .delete("/api/post/" + createdPost.id)
      .expect(200)
      .end(printOnError(done));
    });

    it("makes the db empty", function(done) {
      request(app)
      .get("/api/post/" + NONEXISTING_ID)
      .expect(200)
      .end((err, res) => {
        if(err) { printOnError(done)(err, res); return;}

        Post.getAll((err, posts) => {
          if(err) { printOnError(done)(err, res); return;}
          if(_.isEmpty(posts)) done();
          else {
            console.log(posts);
            done(new Error("Posts are not empty"))
          }
        })
      });
    });
  });

  context("With two posts existing, deleting one of them", function() {
    var postToDelete = null;
    var otherPost = null;

    beforeEach(function(done) {
      async.parallel([
        cb => Post.create(testPost1, cb),
        cb => Post.create(testPost2, cb),
      ], (err, results) => {
        postToDelete = results[0];
        otherPost = results[1];
        done(err);
      });
    });

    it("Deletes the posts to delete", function(done) {
      request(app)
      .delete("/api/post/" + postToDelete.id)
      .expect(200)
      .end((err, res) => {
        if(err) { printOnError(done)(err, res); return;}

        Post.getAll((err, posts) => {
          if(err) { printOnError(done)(err, res); return;}
          for(var post of posts) {
            if(post.id === postToDelete.id) {
              console.log(posts);
              done(new Error("Post was not deleted"))
              return;
            }
          }
          done();
        })
      });
    })

    it("Does not delete the other post", function(done) {
      request(app)
      .delete("/api/post/" + postToDelete.id)
      .expect(200)
      .end((err, res) => {
        if(err) { printOnError(done)(err, res); return;}

        Post.getAll((err, posts) => {
          if(err) { printOnError(done)(err, res); return;}
          for(var post of posts) {
            if(post.id === otherPost.id) {
              done();
              return;
            }
          }
          console.log(posts);
          done(new Error("Other post was deleted"))
        })
      });
    })

  })
});


