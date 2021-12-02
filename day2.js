const values = require("./util/loader.js").getStrings("./data/data2");

const instructions = values.map((v) => {
  const parts = v.split(" ");
  return { direction: parts[0], value: parseInt(parts[1]) };
});

// Part 1
let position = { y: 0, x: 0 };

let actions = {
  up: (p, v) => (p.depth -= v),
  down: (p, v) => (p.depth += v),
  forward: (p, v) => (p.horizontal += v),
};

instructions.forEach((i) => {
  actions[i.direction](position, i.value);
});

console.log("Part 1: " + position.y * position.x);

// Part 2
position = { y: 0, x: 0, aim: 0 };

actions = {
  up: (p, v) => (p.aim -= v),
  down: (p, v) => (p.aim += v),
  forward: (p, v) => {
    p.horizontal += v;
    p.depth += v * p.aim;
  },
};

instructions.forEach((i) => {
  actions[i.direction](position, i.value);
});

console.log("Part 2: " + position.y * position.x);
