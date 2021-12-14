const rows = require("../util/loader.js").getStrings("14/data");

let template = rows[0];
let rules = [];

let pairs = {}; // Part two
for (let i = 2; i < rows.length; i++) {
  let row = rows[i];
  let [pair, element] = row.split(" -> ");
  let [a, b] = pair.split("");
  rules.push({ pair: pair, insert: a + element + b, element: element });

  pairs[pair] = 0; // Part two
}

// Part 1
console.log("Template: " + template);
let polymer = template;

for (let i = 0; i < 10; i++) {
  let matchingPairs = rules.filter((r) => polymer.indexOf(r.pair) >= 0);
  let replacements = [];
  matchingPairs.forEach((mp) => {
    getAllIndexOf(polymer, mp.pair).forEach((idx) => {
      replacements.push({ index: idx + 1, element: mp.element });
    });
  });

  replacements.sort((a, b) => b.index - a.index);

  replacements.forEach((r) => {
    polymer = insert(polymer, r.index, r.element);
  });
  console.log("Polymer " + (i + 1) + ": " + template);
}

const countMap = {};
polymer.split("").forEach((e) => {
  if (countMap[e]) countMap[e]++;
  else {
    countMap[e] = 1;
  }
});
let counts = Object.values(countMap);
counts.sort((a, b) => a - b);
console.log("Result: " + (counts[counts.length - 1] - counts[0]));

// Part 2
polymer = template;

// Setup pair map
for (let i = 0; i < polymer.length - 1; i++) {
  let pPair = polymer.substring(i, i + 2);
  console.log("Pair from polymer: " + pPair);
  if (pairs[pPair]) pairs[pPair]++;
  else pairs[pPair] = 1;
}

// Setup letter map
let letters = {};
for (let i = 0; i < polymer.length; i++) {
  if (letters[polymer[i]]) letters[polymer[i]]++;
  else letters[polymer[i]] = 1;
}

console.log("<INITIAL STATE>");
console.log("Letters:", letters);
console.log("Pairs:", pairs);
console.log("</INITIAL STATE>");

for (let i = 0; i < 40; i++) {
  console.log("ITERATION: " + (i + 1));
  let toRemove = [];
  let lettersToUpdate = {};
  let pairsToUpdate = {};
  for (let j = 0; j < rules.length; j++) {
    let rule = rules[j];
    //console.log("RULE:", rule);
    if (!pairs[rule.pair] || pairs[rule.pair] === 0) continue;

    // console.log("Found pair for rule pair='" + rule.pair + "' and element='" + rule.element + "' in current polymer");
    let leftPair = rule.pair[0] + rule.element;
    let rightPair = rule.element + rule.pair[1];
    let numberOfReplacements = pairs[rule.pair];

    if (!pairs[leftPair]) pairs[leftPair] = 0;
    if (!pairs[rightPair]) pairs[rightPair] = 0;
    if (!letters[rule.element]) letters[rule.element] = 0;

    if (!pairsToUpdate[leftPair]) pairsToUpdate[leftPair] = 0;
    if (!pairsToUpdate[rightPair]) pairsToUpdate[rightPair] = 0;
    if (!lettersToUpdate[rule.element]) lettersToUpdate[rule.element] = 0;

    pairsToUpdate[leftPair] += numberOfReplacements; // NEW
    pairsToUpdate[rightPair] += numberOfReplacements; // NEW
    toRemove.push(rule.pair); // NEW

    lettersToUpdate[rule.element] += numberOfReplacements; // NEW

    // console.log(leftPair, rightPair);
  }

  // COMMIT
  toRemove.forEach((t) => {
    pairs[t] = 0;
  });

  for (const [key, value] of Object.entries(lettersToUpdate)) {
    letters[key] += value;
  }

  for (const [key, value] of Object.entries(pairsToUpdate)) {
    pairs[key] += value;
  }

  console.log("Pairs: ", pairs);
  console.log("Letters: ", letters);
  console.log("Number of pairs: " + Object.values(pairs).reduce((p, c) => p + c, 0));
  console.log("Number of letters: " + Object.values(letters).reduce((p, c) => p + c, 0));
}

counts = Object.values(letters);
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
