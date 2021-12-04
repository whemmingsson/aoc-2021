const values = require("./util/loader.js").getStrings("./data/data3");

// Binary number
let gammaRateBinary = ""; // Most common

// Assume all numbers are of same length
const numBits = values[0].length;

// Number of values
const count = values.length;

// Part one

for (let i = 0; i < numBits; i++) {
  let ones = values.map((v) => parseInt(v[i])).filter((v) => v === 1).length;
  gammaRateBinary += ones > count / 2 ? "1" : "0";
}

const gammaRate = parseInt(gammaRateBinary, 2);
const epsilonRate = Math.pow(2, numBits) - 1 - gammaRate;

console.log(gammaRate * epsilonRate);

//Part two
let oxygenNumbers = [...values];
let co2Numbers = [...values];
for (let i = 0; i < numBits; i++) {
  let ones = oxygenNumbers.filter((v) => v[i] === "1");
  let zeros = oxygenNumbers.filter((v) => v[i] === "0");
  if (ones.length === oxygenNumbers.length / 2) oxygenNumbers = ones;
  else oxygenNumbers = ones.length > oxygenNumbers.length / 2 ? ones : zeros;

  if (oxygenNumbers.length === 1) {
    break;
  }
}

for (let i = 0; i < numBits; i++) {
  if (co2Numbers.length === 1) {
    break;
  }

  let ones = co2Numbers.filter((v) => v[i] === "1");
  let zeros = co2Numbers.filter((v) => v[i] === "0");
  if (ones.length === co2Numbers.length / 2) co2Numbers = zeros;
  else co2Numbers = ones.length < co2Numbers.length / 2 ? ones : zeros;
}

console.log(oxygenNumbers[0]);
console.log(co2Numbers[0]);

console.log(parseInt(oxygenNumbers[0], 2) * parseInt(co2Numbers[0], 2));
