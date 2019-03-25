// Test file for mocha
var assert = require("assert");
var sum = require("../sum").sum;

describe("sum", function() {
  context("with integers", function() {
    var tests = [
      { a: 1, b: 2, expected: 3 },
      { a: 4, b: 9, expected: 13 },
      { a: 0, b: 0, expected: 0 },
      { a: -1, b: 2, expected: 1 },
      { a: 1000, b: 1000, expected: 2000 },
    ]
    tests.forEach((test) => {
      it(test.a + " + " + test.b + " = " + test.expected, function() {
        assert.equal(sum(test.a, test.b), test.expected);
      });
    });
  })

  context("with strings", function() {
    it("should concatenate strings", function() {
      assert.equal(sum("abc", "def"), "abcdef");
    });
  })
});
