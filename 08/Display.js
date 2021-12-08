const Digit = require("./Digit");
const Utils = require("./Utils");
const Chalk = require("chalk");

module.exports = class Display {
  static displayTemplate() {
    return `
 a1a1a1a1      a2a2a2a2      a3a3a3a3      a4a4a4a4 
b1    c1    b2    c2    b3    c3    b4    c4
b1    c1    b2    c2    b3    c3    b4    c4
 d1d1d1d1      d2d2d2d2      d3d3d3d3      d4d4d4d4
e1    f1    e2    f2    e3    f3    e4    f4
e1    f1    e2    f2    e3    f3    e4    f4
 g1g1g1g1      g2g2g2g2      g3g3g3g3      g4g4g4g4`;
  }

  constructor(digits) {
    this.digits = [];
    digits.forEach((d, i) => {
      this.digits.push(new Digit(d, i + 1));
    });
  }

  print() {
    let template = Display.displayTemplate();
    const letters = ["a", "b", "c", "d", "e", "f", "g"];

    this.digits.forEach((d) => {
      letters.forEach((l) => {
        const toReplace = l + d.position;
        if (d.segments.indexOf(l) >= 0) {
          template = Utils.replaceAll(template, toReplace, l);
        } else {
          template = Utils.replaceAll(template, toReplace, ".");
        }
      });
    });

    console.log(template);
  }
};
