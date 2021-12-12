const CaveNode = require("./CaveNode");
const Map = require("./Map");

const rows = require("../util/loader.js").getStrings("12/example");

let map = new Map();

rows.forEach((row) => {
  let [from, to] = row.split("-");
  map.addLink(from, to);
});

map.print();
const numPaths = map.countPaths();
console.log(numPaths);
