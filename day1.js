const values = require("./util/loader.js").getIntegers("./data/data1");
const countIncreases = (arr) => arr.filter((e, i, a) => i > 0 && e > a[i - 1]).length;

// Part 1
console.log(countIncreases(values));

// Part 2
let slidingWindow = [];
for (let i = 0; i < values.length - 2; i++) {
  slidingWindow.push(values[i] + values[i + 1] + values[i + 2]);
}

console.log(countIncreases(slidingWindow));
