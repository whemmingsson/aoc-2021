const { parse } = require("path");
var path = require("path");
var scriptName = path.basename(__filename);
const rgx = /\d+/;
//console.log(rgx.exec(scriptName)[0]);

// XNOR - assumes a and b are of equal length
const xor = (a, b) => {
  return [...a].map((e, i) => (e === b[i] ? "0" : "1")).join("");
};

const xnor = (a, b) => {
  return [...a].map((e, i) => (e === b[i] ? "1" : "0")).join("");
};

console.log("XOR:", xor(xor("101", "110"), "001"));
console.log("XNOR:", xnor(xnor("101", "110"), "001"));

console.log("XOR:", xor(xor(xor(xor("100", "010"), "111"), "110"), "001"));
console.log("XNOR:", xnor(xnor(xnor(xnor("100", "010"), "111"), "110"), "001"));

const values = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"];

console.log(
  "Own xor:",
  parseInt(
    values.reduce((p, c) => xor(p, c)),
    2
  )
);

const intValues = values.map((v) => parseInt(v, 2));
console.log(
  "Built in xor:",
  intValues.reduce((p, c) => p ^ c)
);
