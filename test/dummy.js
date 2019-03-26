var sum = require("../sum").sum;

var tests = [
  { a: 1, b: 2, expected: 3 },
  { a: 4, b: 9, expected: 13 },
  { a: 0, b: 0, expected: 0 },
  { a: -1, b: 2, expected: 1 },
  { a: 0.1, b: 0.2, expected: 0.3 },
  { a: "abc", b: "def", expected: "abcdef" },
]

passed = 0
failed = 0

tests.forEach((spec) => {
  console.log("Testing " + spec.a + " + " + spec.b + " = " + spec.expected);
  if (sum(spec.a, spec.b) === spec.expected) {
    console.log("PASS");
    passed += 1
  } else {
    console.log("FAIL");
    failed += 1
  }
});

console.log(passed + " tests passed");
console.log(failed + " tests failed");
