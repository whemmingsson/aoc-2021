const values = require("./util/loader.js").getStrings("./data/data2");

const instructions = values.map((v) => {
  const parts = v.split(" ");
  return { direction: parts[0], value: parseInt(parts[1]) };
});

// Part 1
let depth = 0;
let horizontal = 0;
instructions.forEach((i) => {
  if (i.direction === "up") depth -= i.value;
  if (i.direction === "down") depth += i.value;
  if (i.direction === "forward") horizontal += i.value;
});

console.log("Part 1");
console.log("Result: " + depth * horizontal);

// Part 2
depth = 0;
horizontal = 0;
let aim = 0;
instructions.forEach((i) => {
  if (i.direction === "up") {
    aim -= i.value;
  }
  if (i.direction === "down") {
    aim += i.value;
  }
  if (i.direction === "forward") {
    horizontal += i.value;
    depth += i.value * aim;
  }
});

console.log("Part 2");
console.log("Result: " + depth * horizontal);
