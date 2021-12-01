const loader = require("./util/loader.js");

const values = loader.getIntegers("./data/data1");

let countIncreases = (arr) => {
  let count = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) count++;
  }

  return count;
};

// Part 1
console.log(countIncreases(values));

// Part 2
let slidingWindow = [];
for (let i = 0; i < values.length - 2; i++) {
  slidingWindow.push(values[i] + values[i + 1] + values[i + 2]);
}

console.log(countIncreases(slidingWindow));
