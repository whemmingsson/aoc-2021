const Utils = require("./Utils");

module.exports = class Digit {
  static digitTemplate() {
    return `
  a1a1a1a1 
 b1    c1
 b1    c1
  d1d1d1d1
 e1    f1
 e1    f1
  g1g1g1g1
 `;
  }

  constructor(segments, pos) {
    this.segments = segments;
    this.position = pos;
  }

  print() {
    const template = Digit.digitTemplate();
    const letters = ["a", "b", "c", "d", "e", "f", "g"];

    letters.forEach((l) => {
      const toReplace = l + this.position;
      if (this.segments.indexOf(l) >= 0) {
        template = Utils.replaceAll(template, toReplace, l);
      } else {
        template = Utils.replaceAll(template, toReplace, ".");
      }
    });

    console.log(template);
  }
};
