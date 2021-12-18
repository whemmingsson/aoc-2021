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
    }

    _parseRaw(pos, current, tab, depth) {
        if (this.raw[pos] == "[") {
            pos++;
            let l = parseInt(this.raw[pos]);
            if (isNaN(l)) {
                let sfLeft = new SFNumber();
                sfLeft.depth = depth;
                sfLeft.parent = current;
                let left = this._parseRaw(pos, sfLeft, tab + "  ", depth + 1)
                current.left = left.value;
                pos = left.pos;
            }
            else {
                current.left = l;

            }
            pos += 2;

            let r = parseInt(this.raw[pos]);

            if (isNaN(r)) {
                let sfRight = new SFNumber();
                sfRight.depth = depth;
                sfRight.parent = current;
                let right = this._parseRaw(pos, sfRight, tab + "  ", depth + 1)
                current.right = right.value;
                pos = right.pos;
            }
            else {
                current.right = r;

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
        return "[" + (this.isPure(this.left) ? this.left : this.left.getRaw()) + "," + (this.isPure(this.right) ? this.right : this.right.getRaw()) + "]";
    }

    isPure(value) {
        return !(value instanceof SFNumber);
    }

    printRaw() {
        if (this.raw)
            console.log("ORG: " + this.raw);

        console.log("CAL: " + this.getRaw());
    }

    add(other) {
        const newNumber = new SFNumber();
        newNumber.left = this;
        newNumber.right = other;
        newNumber.raw = this.raw + "," + other.raw;
        return newNumber;
    }

    explodeChild(c) {
        if (this.left === c) {
            this.left = 0;
        }
        else if (this.right === c) {
            this.right = 0;
        }
    }

    addToParentLeft(value) {
        if (this.isPure(this.left)) {
            this.left += value;
            return;
        }

        if (this.parent == null)
            return;

        this.parent.addToParentLeft(value);
    }

    addToParentRight(value) {
        if (this.isPure(this.right)) {
            this.right += value;
            return;
        }

        if (this.parent == null)
            return;

        this.parent.addToParentRight(value);
    }

    explode() {
        if (!this.parent)
            throw "Trying to perform explode action on root node";

        if (!this.isPure(this.left))
            console.log("Trying to explode value on non-pure left");
        else
            this.parent.addToParentLeft(this.left);

        if (!this.isPure(this.right))
            console.log("Trying to explode value on non-pure right");
        else
            this.parent.addToParentRight(this.right);

        // console.log("Left: ", left);
        //console.log("Right: ", right);

        // This shall be replaced by 0
        this.parent.explodeChild(this);

    }

    split() {

    }

    reduce() {
        if (this.willExplode()) {
            console.log("explode for: " + this.getRaw());
            this.explode();
        }

        if (!this.isPure(this.left)) {
            this.left.reduce();
        }

        if (!this.isPure(this.right)) {
            this.right.reduce();
        }
    }
}