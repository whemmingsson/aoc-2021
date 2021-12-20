const rows = require("../util/loader.js").getStrings("./example").map(v => v.trim());
console.log(rows);
let sum = "";
rows.forEach(r => {
    // console.log(r);
    if (sum.length == 0)
        sum = r;
    else {
        sum = ("[" + sum + "," + r + "]");
    }
    //  console.log("Sum:", sum);

    let actionsLeft = true;


    while (actionsLeft) {
        let stack = [];
        let didPerformReduction = false;
        let didSplit = false;
        let didExplode = false;
        for (let i = 0; i < sum.length; i++) {
            let c = sum[i];
            if (open(c))
                stack.push(c);
            else if (close(c))
                stack.pop();
            else if (isDigit(c)) {
                if (i < sum.length && isDigit(sum[i + 1])) {
                    let result = /\d+/.exec(sum.substring(i, sum.length));

                    if (result && result[0]) {
                        let mdn = parseInt(result[0]);
                        let le = Math.floor(mdn / 2);
                        let ri = Math.ceil(mdn / 2);
                        let newPair = "[" + le + "," + ri + "]";
                        sum = replaceValue(sum, i, result[0].length, newPair);
                    }
                    else {
                        throw "Unexpected error"
                    }

                    didSplit = true;
                    didPerformReduction = true;
                    break;
                }
            }

            if (stack.length > 4) {
                sum = explode(i, sum);
                didExplode = true;
                didPerformReduction = true;
                break;
            }
        }

        validateRow(sum);

        console.log(didExplode ? "After explode" : didSplit ? "After split" : "No reduction", sum);

        if (didPerformReduction) actionsLeft = true;
        else actionsLeft = false;
    }
});

console.log("Final sum: " + sum);

function explode(i, r) {
    //console.log("Found 4 deep number at", i, "with value", r[i + 1]);
    // Find the values of the pair
    let stop = findNextClosePos(r, i);
    let pair = r.substring(i + 1, stop);
    let [left, right] = pair.split(",").map(v => parseInt(v));

    let leftValueAndIndex = findFirstPureNumberToTheLeft(r, i);
    let rPreRep = r;
    // Add the values of this pair to the closest left number and closest right number
    if (leftValueAndIndex.value !== null) {
        let repValue = leftValueAndIndex.value + left;
        r = replaceValue(r, leftValueAndIndex.index, leftValueAndIndex.length, repValue);
    }

    // If we messed up the index, correct for it...
    if (r.length > rPreRep.length) {
        i += (r.length - rPreRep.length);
    }

    let rightValueAndIndex = findFirstPureNumberToTheRight(r, i + pair.length + 2);
    rPreRep = r;
    if (rightValueAndIndex.value != null) {
        let repValue = rightValueAndIndex.value + right;
        r = replaceValue(r, rightValueAndIndex.index, rightValueAndIndex.length, repValue);
    }

    //Replace this entire pair with 0
    r = replaceValue(r, i, pair.length + 2, 0);

    return r;
}

function replaceValue(str, from, length, replacement) {
    let first = str.substring(0, from);
    let middle = replacement;
    let last = str.substring(from + length, str.length);
    return first + middle + last;
}

function isDigit(str) {
    return !isNaN(parseInt(str));
}

function findFirstPureNumberToTheLeft(str, start) {
    let subStr = str.substring(0, start);
    const matches = subStr.match(/\d+/g);

    if (matches && matches.length) {
        const lastMatch = matches[matches.length - 1];
        const lastIndex = subStr.lastIndexOf(lastMatch);
        return { value: parseInt(lastMatch), index: lastIndex, length: lastMatch.length };
    }

    return { value: null, index: -1 };
}

function findFirstPureNumberToTheRight(str, start) {
    let result = /\d+/.exec(str.substring(start, str.length));

    if (result && result[0]) {
        return { value: parseInt(result[0]), index: start + result.index, length: result[0].length }
    }

    return { value: null, index: -1 };
}

function open(char) {
    return char == "[";
}

function close(char) {
    return char == "]";
}

function getDigit(str) {
    if (!isDigit(str))
        throw "Not an integer digit";

    return parseInt(str);
}

function findNextClosePos(r, from) {
    for (let i = from; i < r.length; i++) {
        if (close(r[i])) return i;
    }

    return -1;
}

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