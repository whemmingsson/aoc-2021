const rows = require("../util/loader.js").getStrings("14/data");

let template = rows[0];
let rules = [];
for (let i = 2; i < rows.length; i++) {
  let row = rows[i];
  [pair, element] = row.split(" -> ");
  let [a, b] = pair.split("");
  rules.push({ pair: pair, insert: a + element + b, element: element });
}

console.log("Template: " + template);
for (let i = 0; i < 40; i++) {
  let matchingPairs = rules.filter((r) => template.indexOf(r.pair) >= 0);
  let replacements = [];
  matchingPairs.forEach((mp) => {
    getAllIndexOf(template, mp.pair).forEach((idx) => {
      replacements.push({ index: idx + 1, element: mp.element });
    });
  });

  replacements.sort((a, b) => b.index - a.index);

  replacements.forEach((r) => {
    template = insert(template, r.index, r.element);
  });

  console.log("Polymer " + (i + 1));

  //console.log("Polymer " + (i + 1) + ": " + template);
}

const countMap = {};
template.split("").forEach((e) => {
  if (countMap[e]) countMap[e]++;
  else {
    countMap[e] = 1;
  }
});
const counts = Object.values(countMap);
counts.sort((a, b) => a - b);
console.log("Result: " + (counts[counts.length - 1] - counts[0]));

function insert(source, index, string) {
  if (index > 0) {
    return source.substring(0, index) + string + source.substr(index);
  }

  return string + source;
}

function getAllIndexOf(source, str) {
  let result = [];
  let index = -1;

  do {
    index = source.indexOf(str, index + 1);
    if (index != -1) result.push(index);
  } while (index != -1);

  return result;
}
