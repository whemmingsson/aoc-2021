const values = require("./util/loader.js").getStrings("./data/data2");

const instructions = values.map((v) => {
  const parts = v.split(" ");
  return { direction: parts[0], value: parseInt(parts[1]) };
});

const calculateAndPrintResult = (acts, pos, ptNr) => {
  instructions.forEach((i) => {
    acts[i.direction](pos, i.value);
  });

  console.log(`Part ${ptNr}: ${position.y * position.x}`);
};

// Part 1
let position = { y: 0, x: 0 };

let actions = {
  up: (p, v) => (p.y -= v),
  down: (p, v) => (p.y += v),
  forward: (p, v) => (p.x += v),
};

calculateAndPrintResult(actions, position, 1);

// Part 2
position = { y: 0, x: 0, aim: 0 };

actions = {
  up: (p, v) => (p.aim -= v),
  down: (p, v) => (p.aim += v),
  forward: (p, v) => {
    p.x += v;
    p.y += v * p.aim;
  },
};

calculateAndPrintResult(actions, position, 2);
