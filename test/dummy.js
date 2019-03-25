// Test file for mocha
var assert = require("assert");
var sum = require("../sum").sum;

describe("sum of 1 and x", function() {
  context("with y = 1", function() {
    var y = 1
    it("should be equal to two", function() {
      assert.equal(sum(1, y), 2);
    });
  })

  context("with y = 2", function() {
    var y = 2
    it("should be equal to three", function() {
      assert.equal(sum(1, y), 3);
    });
  })
});