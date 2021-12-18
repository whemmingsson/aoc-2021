module.exports = class SFNumber {
    constructor(raw) {
        this.left = null;
        this.right = null;
        if (raw) {
            this.raw = raw;
            this._parseRaw(0, this, "", 0);
        }
        this.depth = 0;
        this.parent = null; // For moving up the tree
        this.index = 0;
    }

    _parseRaw(pos, current, tab, depth) {
        if (this.raw[pos] == "[") {
            pos++;
            let l = parseInt(this.raw[pos]);
            if (isNaN(l)) {
                let sfLeft = new SFNumber();
                sfLeft.depth = depth;
                sfLeft.parent = current;
                sfLeft.index = pos;
                let left = this._parseRaw(pos, sfLeft, tab + "  ", depth + 1)
                current.left = left.value;
                pos = left.pos;
            }
            else {
                current.left = { value: l, index: pos };

            }
            pos += 2;

            let r = parseInt(this.raw[pos]);

            if (isNaN(r)) {
                let sfRight = new SFNumber();
                sfRight.depth = depth;
                sfRight.parent = current;
                sfRight.index = pos;
                let right = this._parseRaw(pos, sfRight, tab + "  ", depth + 1)
                current.right = right.value;
                pos = right.pos;
            }
            else {
                current.right = { value: r, index: pos };

            }
            pos += 1;
        }
        else {
            return { value: parseInt(this.raw[pos]), pos: pos };
        }

        return { value: current, pos: pos };
    }

    print(tab) {
        //console.log(tab + "SF NUMBER " + " (will explode: " + this.willExplode() + ")")
        if (this.left instanceof SFNumber)
            this.left.print(tab + "  ");
        else
            console.log(tab + this.left);

        if (this.right instanceof SFNumber)
            this.right.print(tab + " ");
        else
            console.log(tab + this.right);
    }

    willExplode() {
        return this.depth === 3;
    }

    willSplit() {
        return this.depth === 3;
    }

    getRaw() {
        return "[" + (SFNumber.isPure(this.left) ? this.left.value : this.left.getRaw()) + "," + (SFNumber.isPure(this.right) ? this.right.value : this.right.getRaw()) + "]";
    }

    static isPure(value) {
        return !(value instanceof SFNumber);
    }

    printRaw() {
        console.log(this.getRaw());
    }

    add(other) {
        const newNumber = new SFNumber();
        newNumber.left = this;
        newNumber.right = other;
        newNumber.raw = this.raw + "," + other.raw;
        return newNumber;
    }

    explodeChild(c) {
        console.log("Replace ", c, "with 0");
        if (this.left === c) {
            let p = this.left.index;
            this.left = { index: p, value: 0 };
        }
        else if (this.right === c) {
            let p = this.right.index;
            this.right = { index: p, value: 0 };
        }
    }

    explode() {
        if (!this.parent)
            throw "Trying to perform explode action on root node";

        console.log(this);

        if (!SFNumber.isPure(this.left))
            console.log("Trying to explode value on non-pure left");
        else {
            let r = this.getRoot();
            let i = -1;
            console.log(r.getRaw());
            let searchStr = r.getRaw().substring(0, this.index);
            console.log("Search string", searchStr);
            for (let j = searchStr.length - 1; j >= 0; j--) {
                let d = searchStr[j];
                if (!isNaN(parseInt(d))) {
                    i = j;
                    break;
                }
            }
            if (i != -1) {
                console.log("Found integer at index", i);
                let n = this.getNumberWithIndex(i);
                console.log(n);
                if (n && n.value) {
                    n.value += this.left.value;
                }
            }
            else {
                console.log("No number to the left found...")
            }

        }

        if (!SFNumber.isPure(this.right))
            console.log("Trying to explode value on non-pure right");
        else {
            // this.parent.addToParentRight(this.right);
            let r = this.getRoot();
            let i = -1;

            let raw = r.getRaw();
            let searchStr = raw.substring(this.right.index + 1, raw.length - 1);
            console.log("Search string", searchStr);

            for (let j = this.right.index + 1; j < raw.length; j++) {
                let d = raw[j];
                if (!isNaN(parseInt(d))) {
                    i = j;
                    break;
                }
            }
            if (i != -1) {
                console.log("Found integer at index", i);
                let n = this.getNumberWithIndex(i);
                console.log(n);
                if (n && n.value) {
                    n.value += this.right.value;
                }
            }
            else {
                console.log("No number to the right found...")
            }
        }

        // console.log("Left: ", left);
        //console.log("Right: ", right);

        // 'this' shall be replaced by 0
        this.parent.explodeChild(this);

    }

    getNumberWithIndex(index) {
        let r = this.getRoot();
        return SFNumber.getNumberWithIndexRecursive(r, index);
    }

    static getNumberWithIndexRecursive(number, index) {
        if (!number)
            return null;

        if (number.index == index)
            return number;

        let numberOnLeft = SFNumber.getNumberWithIndexRecursive(number.left, index);

        if (numberOnLeft != null)
            return numberOnLeft;

        let numberOnRight = SFNumber.getNumberWithIndexRecursive(number.right, index);
        if (numberOnRight != null)
            return numberOnRight;

        return null;
    }

    split() {

    }

    reduce() {
        if (this.willExplode()) {
            console.log("explode for: " + this.getRaw());
            this.explode();
        }

        if (!SFNumber.isPure(this.left)) {
            this.left.reduce();
        }

        if (!SFNumber.isPure(this.right)) {
            this.right.reduce();
        }
    }

    getRoot() {
        if (this.parent === null)
            return this;

        return this.parent.getRoot();
    }
}