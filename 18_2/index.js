const rows = require("../util/loader.js").getStrings("18_2/example").map(v => v.trim());
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
        for (let i = 0; i < sum.length; i++) {
            let c = sum[i];
            if (open(c))
                stack.push(c);
            else if (close(c))
                stack.pop();
            else if (isDigit(c)) {
                if (i < sum.length && isDigit(sum[i + 1])) {
                    console.log("Will split...");
                    let multiDigitNumer = c;
                    let j = i + 1;
                    while (isDigit(sum[j]) && j <= sum.length) {
                        multiDigitNumer += sum[j];
                        j++;
                    }
                    console.log(multiDigitNumer);

                    let mdn = parseInt(multiDigitNumer);
                    let le = Math.floor(mdn / 2);
                    let ri = Math.ceil(mdn / 2);
                    let newPair = "[" + le + "," + ri + "]";
                    sum = replaceValue(sum, i, multiDigitNumer.length, newPair);
                    console.log(newPair);
                    didPerformReduction = true;
                    break;
                }
            }

            if (stack.length > 4) {
                console.log("Will explode...");
                sum = explode(i, sum);
                didPerformReduction = true;
                break;
            }
        }

        console.log("Loop ended, didReduce:", didPerformReduction);
        console.log("Current sum: ", sum);

        if (didPerformReduction) actionsLeft = true;
        else actionsLeft = false;
    }
});

console.log("Final sum: " + sum);

function explode(i, r) {
    console.log("Found 4 deep number at", i, "with value", r[i + 1]);
    // Find the values of the pair
    let stop = findNextClosePos(r, i);
    let pair = r.substring(i + 1, stop);
    let [left, right] = pair.split(",").map(v => parseInt(v));

    let leftValueAndIndex = findFirstPureNumberToTheLeft(r, i);
    let rightValueAndIndex = findFirstPureNumberToTheRight(r, i + pair.length + 1);

    // Add the values of this pair to the closest left number and closest right number
    if (leftValueAndIndex.value !== null) {
        let repValue = leftValueAndIndex.value + left;
        r = replaceValue(r, leftValueAndIndex.index, leftValueAndIndex.length, repValue);
    }
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
    for (let i = start; i >= 0; i--) {
        // Not a digit, continue
        if (!isDigit(str[i])) continue;

        // Single digit number
        if (i > 0 && !isDigit(str[i - 1]))
            return { value: getDigit(str[i]), index: i, length: 1 };

        // Here we have a multidigit number, where str[i] is the last digit. 
        // Parse until we dont have a digit anymore
        let multiDigitNumer = str[i];
        let j = i - 1;
        while (isDigit(str[j]) && j >= 0) {
            multiDigitNumer = str[j] + multiDigitNumer;
            j--;
        }

        return { value: parseInt(multiDigitNumer), index: j + 1, length: multiDigitNumer.length }; // Add 1 because loop above steped past the true index
    }

    return { value: null, index: -1 };
}

function findFirstPureNumberToTheRight(str, start) {
    for (let i = start; i < str.length; i++) {
        // Not a digit, continue
        if (!isDigit(str[i])) continue;

        // Single digit number
        if (i < str.length && !isDigit(str[i + 1]))
            return { value: getDigit(str[i]), index: i, length: 1 };

        // Here we have a multidigit number, where str[i] is the first digit. 
        // Parse until we dont have a digit anymore
        let multiDigitNumer = str[i];
        let j = i + 1;
        while (isDigit(str[j]) && j <= str.length) {
            multiDigitNumer += str[j];
            j++;
        }

        return { value: parseInt(multiDigitNumer), index: j - 1, length: multiDigitNumer.length }; // Remove 1 because loop above steped past the true index
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

/* 


 let actionsLeft = false;

    while (actionsLeft) {
        let stack = [];
        let didPerformReduction = false;
        for (let i = 0; i < sum.length; i++) {
            let c = sum[i];
            if (open(c))
                stack.push(c);
            else if (close(c))
                stack.pop();
            else if (isDigit(c)) {
                if (i < sum.length && isDigit(sum[i + 1])) {
                    console.log("Will split...");
                    let multiDigitNumer = c;
                    let j = i + 1;
                    while (isDigit(sum[j]) && j <= sum.length) {
                        multiDigitNumer += sum[j];
                        j++;
                    }
                    console.log(multiDigitNumer);

                    let mdn = parseInt(multiDigitNumer);
                    let le = Math.floor(mdn / 2);
                    let ri = Math.ceil(mdn / 2);
                    let newPair = "[" + le + "," + ri + "]";
                    sum = replaceValue(sum, i, multiDigitNumer.length, newPair);
                    console.log(newPair);
                    didPerformReduction = true;
                    break;
                }
            }

            if (stack.length > 4) {
                console.log("Will explode...");
                sum = explode(i, sum);
                didPerformReduction = true;
                break;
            }
        }

        console.log("Loop ended, didReduce:", didPerformReduction);

        if (didPerformReduction) actionsLeft = true;
        else actionsLeft = false;
    }
 */