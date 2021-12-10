module.exports = class Stack {
  constructor() {
    this.values = [];
  }

  push(value) {
    this.values.push(value);
  }

  pop() {
    return this.values.pop();
  }

  peek() {
    return this.values[this.values.length - 1];
  }

  print() {
    console.log(this.values);
  }

  isEmpty() {
    return this.values.length === 0;
  }
};
