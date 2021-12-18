const SFNumber = require("./SFNumber");
const rows = require("../util/loader.js").getStrings("18/example");

rows.forEach(r => {
    let num = new SFNumber(r);
    console.log("RESULT:");
    num.printRaw();

    num.print("");
    num.reduce();

    num.printRaw();


});

// TEST:
let n1 = new SFNumber("[1,2]");
let n2 = new SFNumber("[[3,4],5]")

let n3 = n1.add(n2);
//console.log(n3);