// Test file for mocha
var assert = require("assert");
var app = require("../app");

before(function() {
  console.log("Salamnader");
})

describe("getAllPosts", function() {
  context("with no posts created", function() {
    it("returns an empty list", function() {
      assert.equals(app.getAllPosts().length, 0);
    });
  })
});
