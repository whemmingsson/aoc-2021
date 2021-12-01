const values = require("./util/loader.js").getIntegers("./data/data1");
const countIncreases = (arr) => arr.filter((e, i, a) => i > 0 && e > a[i - 1]).length;

// Part 1
console.log("Part 1", countIncreases(values));

// Part 2
let slidingWindow = [];
for (let i = 0; i < values.length - 2; i++) {
  slidingWindow.push(values.slice(i, i + 3).reduce((s, v) => s + v, 0));
}

console.log("Part 2", countIncreases(slidingWindow));
