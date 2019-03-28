// Test file for mocha
var assert = require("assert");
var request = require("supertest");
var app = require("../app");
var Post = require("../models/post");
var async 

var testPost1 = {
  title: "foo title",
  content: "bar content",
  author: "baz author",
  tags: ['foo-tag', 'bar-tag']
}



describe("getAllPosts", function() {
  before(function(done) {
      Post.deleteAll(done);
  });

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
    before(function(done) {
      Post.create(testPost1, done);
    });

    it("Returns a well-formatted empty response.", function(done) {
      request(app)
        .get("/api/")
        .expect(200)
        .expect({"posts": [testPost1]})
        .end(done);
    });
  });
});


