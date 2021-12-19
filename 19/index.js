const rows = require("../util/loader.js").getStrings("19/data");

let digitRegex = /\d+/;
let scanners = [];
let currentScanner;
for (let i = 0; i < rows.length; i++) {
  let row = rows[i];
  if (!row) continue;

  if (row.indexOf("---") >= 0) {
    currentScanner = { id: parseInt(digitRegex.exec(row)[0]), beacons: [] };
    scanners.push(currentScanner);
  } else {
    if (!currentScanner) throw "Parsing error at row: " + row;

    let [a, b, c] = row.split(",").map((v) => parseInt(v));
    // Three dimensional data
    if (c) currentScanner.beacons.push({ a: a, b: b, c: c });
    // Two dimensional data
    else currentScanner.beacons.push({ a: a, b: b });
  }
}

scanners.forEach((s) => {
  console.log("Scanner: " + s.id);
  s.beacons.forEach((b) => {
    console.log(b);
  });
  console.log();
});

function enumerate(vector) {
  // vector has a, b c
  /*

    x  y  z
    =======
    
    

    for each of these enumerations


    */
}
