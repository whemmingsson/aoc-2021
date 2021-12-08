const rows = require("../util/loader.js").getStrings("08/data");

// Part 1
const isEasyDigit = (x) => {
  const l = x.length;
  return (l > 1 && l < 5) || l == 7;
};

console.log(rows.flatMap((r) => r.split("|")[1].split(" ").filter(isEasyDigit)).length);
