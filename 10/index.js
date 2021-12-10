const Stack = require("./Stack.js");

const rows = require("../util/loader.js").getStrings("10/data");

const errorValue = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const errorValuePart2 = { ")": 1, "]": 2, "}": 3, ">": 4 };

let errorPoints = 0;
let incomplete = [];
rows.forEach((row) => {
  console.log("PARSNING: " + row);
  const symbols = row.split("");
  const stack = new Stack();
  let valid = true;

  for (let i = 0; i < symbols.length; i++) {
    let s = symbols[i];

    if (isOpeningSymbol(s)) {
      stack.push(s);
    } else {
      let openSymbol = stack.pop();
      let expected = closingSymbol(openSymbol);
      if (s !== expected) {
        valid = false;
        console.log("Expected: " + expected + " but found " + s);
        // Part 1 score
        errorPoints += errorValue[s];
        break;
      }
    }

    //stack.print();

    if (i < symbols.length - 1 && stack.isEmpty()) {
      valid = false;
      break;
    }
  }

  console.log("PARSNING DONE: " + (stack.isEmpty() && valid ? "VALID" : !stack.isEmpty() && valid ? "INCOMPLETE" : "INVALID"));

  if (!stack.isEmpty() && valid) {
    incomplete.push(stack);
  }
});

console.log("Part 1: " + errorPoints);

let scores = [];
incomplete.forEach((stack) => {
  let score = 0;
  while (!stack.isEmpty()) {
    let s = closingSymbol(stack.pop());
    score *= 5;
    score += errorValuePart2[s];
  }
  scores.push(score);
});

scores.sort((a, b) => {
  return a - b;
});

let middlePos = Math.round(scores.length - 1) / 2;
console.log(scores[middlePos]);

function isOpeningSymbol(symbol) {
  return symbol === "(" || symbol === "[" || symbol === "<" || symbol === "{";
}

function closingSymbol(s) {
  switch (s) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "<":
      return ">";
    case "{":
      return "}";
  }
}
