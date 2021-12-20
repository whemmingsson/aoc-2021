const SFNumber = require("./SFNumber");
const rows = require("../util/loader.js").getStrings("./example").map(r => r.trim());

let sum = null;
rows.forEach(r => {
    let num = new SFNumber(r);
    // num.printRaw();
    validateRow(num.getRaw());

    if (sum == null) {
        sum = num;
    }
    else {
        console.log("   " + sum.getRaw());
        console.log("+  " + num.getRaw());
        sum = sum.add(num);
    }

    let actionsLeft = true;

    while (actionsLeft) {

        let willExplode = SFNumber.willExplode(sum);

        if (willExplode) {
            willExplode.explodeMe();
            //console.log("After explode:", sum.getRaw());
            continue; // Jump to next reduction cycle
        }

        let willSplit = SFNumber.willSplit(sum);

        if (willSplit) {
            willSplit.splitMe();
            //console.log("After split:", sum.getRaw());
            continue; // Jump to next reduction cycle
        }

        actionsLeft = false; // No reductions - break
    }

    //console.log("Reduction complete: ", sum.getRaw())
    console.log("=  " + sum.getRaw());
    console.log("");
});

//console.log("Summation complete:", sum);


function validateRow(row) {
    let stack = [];
    row.split("").forEach(e => {
        if (open(e))
            stack.push(e);
        else if (close(e))
            stack.pop();
    });

    if (stack.length !== 0) {
        throw "ERROR";
    }
}

function open(char) {
    return char == "[";
}

function close(char) {
    return char == "]";
}

/*
// TEST:
let n1 = new SFNumber("[1,2]");
let n2 = new SFNumber("[[3,4],5]")

let n3 = n1.add(n2);
//console.log(n3); */