const Digit = require("./Digit");
const Display = require("./Display");
const rows = require("../util/loader.js").getStrings("08/example");

// Part 1
const isEasyDigit = (x) => {
  const l = x.length;
  return (l > 1 && l < 5) || l == 7;
};

//console.log(rows.flatMap((r) => r.split("|")[1].split(" ").filter(isEasyDigit)).length);

const letters = ["a", "b", "c", "d", "e", "f", "g"];
// Part 2
rows.forEach((row) => {
  const [input, output] = row.split("|");

  const outputSegments = output.split(" ").filter((d) => d !== "");

  // Each of these is a digit
  const digits = input
    .split(" ")
    .filter((d) => d !== "")
    .map(sortStr);

  // Deduction part.... or brute force!
  for (let i = 0; i < letters.length; i++) {
    let letterFrom = letters[i];
    for (let j = 0; j < letters.length; j++) {
      if (i === j) continue;
      let letterTo = letters[j];

      console.log(letterFrom + " -> " + letterTo);

      // Replace
      console.log(digits);
      let digitsTest = digits.map((d) => d.replace(letterTo, ".")).map((d) => d.replace(letterFrom, letterTo));
      //.map((d) => d.replace(".", letterTo));
      console.log(digitsTest);

      // Validate
    }
  }

  //console.log(4 + sixOrNine.length + rest.length);

  //let display = new Display(segments);
  //display.print();
});

function sortStr(str) {
  return str.split("").sort().join("");
}

function validDigit(digit) {
  return getValue(digit) !== -1;
}

function getValue(segments) {
  switch (segments) {
    case "cf":
      return 1;
    case "acdeg":
      return 2;
    case "acdfg":
      return 3;
    case "bcdf":
      return 4;
    case "abdfg":
      return 5;
    case "abdefd":
      return 6;
    case "acf":
      return 7;
    case "abcdefg":
      return 8;
    case "abcdfg":
      return 9;
    case "abcefg":
      return 0;
  }

  return -1;
}
