var test = require("tape");
var sum = require("../sum").sum;

var tests = [
  { a: 1, b: 2, expected: 3 },
  { a: 4, b: 9, expected: 13 },
  { a: 0, b: 0, expected: 0 },
  { a: -1, b: 2, expected: 1 },
  { a: 0.1, b: 0.2, expected: 0.3 },
]

tests.forEach((spec) => {
  test(spec.a + " + " + spec.b + " = " + spec.expected, function(assert) {
    assert.equal(sum(spec.a, spec.b), spec.expected);
    assert.end();
  });
});

test("strings", (assert) => {
  assert.equal(sum("abc", "def"), "abcdef");
  assert.end();
});
