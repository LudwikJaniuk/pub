// Test file for mocha
var assert = require("assert");
var app = require("../app");

var testPost1 = {
  title: "foo title",
  content: "bar content",
  author: "baz author",
  tags: ['foo-tag', 'bar-tag']
}

before(function(done) {
  app.createPost(testPost1);
})

describe("getAllPosts", function() {
    it("returns an empty list", function() {
      assert.equals(app.getAllPosts().length, 0);
    });

});
