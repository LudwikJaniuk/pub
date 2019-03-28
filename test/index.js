// Test file for mocha
var assert = require("assert");
var request = require("supertest");
var app = require("../app");

var testPost1 = {
  title: "foo title",
  content: "bar content",
  author: "baz author",
  tags: ['foo-tag', 'bar-tag']
}

describe("getAllPosts", function() {
    it("returns 200", function(done) {
      request(app)
        .get("/api/")
        .expect(200)
        .expect({"posts": []})
        .end(done);
    });
});

