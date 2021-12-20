module.exports = class SFNumber {
    constructor(raw) {
        this.left = null;
        this.right = null;
        if (raw) {
            this.raw = raw;
            this._parseRaw(0, this, "", 1);
        }
        this.depth = 0;
        this.parent = null; // For moving up the tree
        this.index = 0;
    }

    _parseRaw(pos, current, tab, depth) {
        if (this.raw[pos] == "[") {
            pos++;
            let l = parseInt(this.raw[pos]);

            let n = "";
            if (isNaN(l)) {
                let sfLeft = new SFNumber();
                sfLeft.depth = depth;
                sfLeft.parent = current;
                let left = this._parseRaw(pos, sfLeft, tab + "  ", depth + 1)
                current.left = left.value;
                pos = left.pos;
                pos += 2;
            }
            else {
                n = SFNumber.getFirstNumber(this.raw, pos);
                current.left = { value: n };
                pos += (1 + n.toString().length);
            }

            let r = parseInt(this.raw[pos]);

            if (isNaN(r)) {
                let sfRight = new SFNumber();
                sfRight.depth = depth;
                sfRight.parent = current;
                let right = this._parseRaw(pos, sfRight, tab + "  ", depth + 1)
                current.right = right.value;
                pos = right.pos;
                pos += 1;
            }
            else {
                n = SFNumber.getFirstNumber(this.raw, pos);
                current.right = { value: n };
                pos += n.toString().length;
            }

        }
        else {
            return { value: parseInt(this.raw[pos]), pos: pos };
        }

        return { value: current, pos: pos };
    }

    static getFirstNumber(str, start) {
        let result = /\d+/.exec(str.substring(start, str.length));

        if (result && result[0]) {
            return parseInt(result[0]);
        }

        return -1;
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
        const newRaw = "[" + this.getRaw() + "," + other.getRaw() + "]";
        return new SFNumber(newRaw);
    }

    explodeChild(c) {
        if (this.left === c) {
            this.left = { value: 0 }
        }
        else if (this.right === c) {
            this.right = { value: 0 }
        }
    }

    splitMe() {
        if (SFNumber.isPure(this.left) && this.left.value >= 10) {
            this.left = SFNumber.splitPure(this.left, this.depth + 1, this);
        }
        else if (SFNumber.isPure(this.right) && this.right.value >= 10) {
            this.right = SFNumber.splitPure(this.right, this.depth + 1, this);
        }
    }

    explodeMe() {
        // LEFT
        let left = null;
        if (this.parent && this.parent.left && SFNumber.isPure(this.parent.left)) {
            left = this.parent.left;
        }
        else if (this.parent) {
            left = SFNumber.findNumberOnLeft(this, this.parent);
        }

        if (left) {
            left.value += this.left.value;
        }

        // RIGHT
        let right = null;
        if (this.parent && this.parent.right && SFNumber.isPure(this.parent.right)) {
            right = this.parent.right;
        }
        else if (this.parent) {
            right = SFNumber.findNumberOnRight(this, this.parent);
        }

        if (right) {
            right.value += this.right.value;
        }

        if (this.parent) {
            this.parent.explodeChild(this);
        }
        else {
            throw "Cannot explode parent";
        }
    }

    static findNumberOnLeft(prev, current) {
        if (!SFNumber.isPure(current.left) && current.left == prev && current.parent) {
            return SFNumber.findNumberOnLeft(current, current.parent);
        }
        else if (!SFNumber.isPure(current.left) && current.left != prev) {
            current = current.left;
            while (!SFNumber.isPure(current.right)) {
                current = current.right;
            }
            return current.right;
        }
        else if (SFNumber.isPure(current.left)) {
            return current.left;
        }
    }

    static findNumberOnRight(prev, current) {
        if (!SFNumber.isPure(current.right) && current.right == prev && current.parent) {
            return SFNumber.findNumberOnRight(current, current.parent);
        }
        else if (!SFNumber.isPure(current.right) && current.right != prev) {
            current = current.right;
            while (!SFNumber.isPure(current.left)) {
                current = current.left;
            }
            return current.left;
        }
        else if (SFNumber.isPure(current.right)) {
            return current.right;
        }
    }


    static splitPure(pure, depth, parent) {
        let le = Math.floor(pure.value / 2);
        let ri = Math.ceil(pure.value / 2);
        let newNode = new SFNumber();
        newNode.left = { value: le };
        newNode.right = { value: ri };
        newNode.depth = depth;
        newNode.parent = parent
        return newNode;
    }

    static willSplit(number) {
        if (number && SFNumber.isPure(number.left) && number.left.value >= 10) {
            return number;
        }
        else if (number && SFNumber.isPure(number.right) && number.right.value >= 10) {
            return number;
        }

        let splitNumber = null;

        if (number && !SFNumber.isPure(number.left))
            splitNumber = SFNumber.willSplit(number.left);

        if (!splitNumber && number && !SFNumber.isPure(number.right))
            splitNumber = SFNumber.willSplit(number.right);

        return splitNumber;
    }

    static willExplode(number) {
        if (number && number.depth === 4) {
            return number;
        }

        let numToExplode = null;
        if (number && number.left && !SFNumber.isPure(number.left))
            numToExplode = SFNumber.willExplode(number.left);
        if (!numToExplode && number && number.right && !SFNumber.isPure(number.right))
            numToExplode = SFNumber.willExplode(number.right);

        return numToExplode;
    }

    getRoot() {
        if (this.parent === null)
            return this;

        return this.parent.getRoot();
    }
}