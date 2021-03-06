const input = require("../util/loader.js").getStrings("16/data")[0];

const hexToBinaryMap = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const binaryInput = input
  .split("")
  .map((i) => hexToBinaryMap[i])
  .join("");

console.log(binaryInput);

const HEADER_VERSION_LENGTH = 3;
const HEADER_TYPEID_LENGTH = 3;
const GROUP_LENGTH = 5;

let pos = 0;

let versionSum = 0;

let packetValue = parsePacket("");

console.log("Version sum: ", versionSum);
console.log("Packet value: ", packetValue);

function parsePacket(tab) {
  const header = parseHeader();
  console.log(tab + "Found packet with version: " + header.version + " and ID: " + header.typeID);
  if (isLiteralValue(header.typeID)) {
    return parseLiteralPacket(tab);
  }
  else {
    return parseOperatorPacket(tab, header.typeID);
  }
}

function parseHeader() {
  let versionBits = getSubString(HEADER_VERSION_LENGTH);
  let version = getNumber(versionBits);
  let typeIdBits = getSubString(HEADER_TYPEID_LENGTH);
  let typeId = getNumber(typeIdBits);

  // Part 1
  versionSum += version;

  return { version: version, typeID: typeId };
}

function parseOperatorPacket(tab, operation) {
  console.log(tab + "Parsing operator packet");
  let packetValue = 0
  let subPacketValues = [];
  let lengthTypeIdBit = getSubString(1);
  if (lengthTypeIdBit == "0") {
    // If the length type ID is 0, then the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
    let lengthInBitBits = getSubString(15);
    let lengthInBit = binToDec(lengthInBitBits);
    console.log(tab + "Number of BITS for subpackets in this packet " + lengthInBit);

    // We want to parse subpackets while pos < pos+lengthInBit
    let targetPos = pos + lengthInBit;
    console.log(tab + "Target pos: ", targetPos)
    while (pos < targetPos) {
      subPacketValues.push(parsePacket(tab + "  "));
    }

  }
  else {
    //  If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet. */
    let numberOfSubPacketsBits = getSubString(11);
    let numberOfSubPackets = binToDec(numberOfSubPacketsBits);
    console.log(tab + "Number of subpackets in this packet: " + numberOfSubPackets);

    let count = 0;
    while (count < numberOfSubPackets) {
      subPacketValues.push(parsePacket(tab + "  "));
      count++;
    }
  }

  return calculateValue(subPacketValues, operation);
}

function parseLiteralPacket(tab) {
  console.log(tab + "Parsing literal value packet")
  let group = "1";
  let groups = [];
  while (!isEndGroup(group)) {
    let groupBits = getSubString(GROUP_LENGTH);
    if (groupBits.length !== GROUP_LENGTH) {
      console.log(tab + "Expected group of length: " + GROUP_LENGTH + " but found length: " + groupBits.length);
      break;
    }
    else {
      group = groupBits;
      groups.push({ bits: groupBits.substring(1, GROUP_LENGTH), isEndGroup: isEndGroup(group) });
    }
  }

  console.log(tab + "Found groups: ", groups);
  let literalValueBits = groups.map(g => g.bits).join("");
  let literalValue = binToDec(literalValueBits);
  console.log(tab + "Literal value bits: " + literalValueBits + " (length: " + literalValueBits.length + ") with value: " + literalValue);
  return literalValue;
}

function getSubString(length) {
  let str = binaryInput.substring(pos, pos + length);
  pos += length;
  return str;
}

function binToDec(bits) {
  return parseInt(bits, 2);
}

function getNumber(bits) {
  if (bits.length !== 3)
    throw "Expected bits of length 3 but got " + bits.length;

  return parseInt(bits, 2);
}

function isEndGroup(bits) {
  if (!bits || !bits.length) return -1;

  return bits[0] == "0";
}

function isLiteralValue(value) {
  return value === 4;
}

function calculateValue(values, operation) {
  if (!values) return 0;

  // SUM
  if (operation == 0) {
    return values.reduce((p, c) => p + c, 0);
  }

  // PRODUCT
  if (operation == 1) {
    return values.reduce((p, c) => p * c, 1);
  }

  // MIN
  if (operation == 2) {
    return Math.min(...values);
  }

  // MAX
  if (operation == 3) {
    return Math.max(...values);
  }

  // GREATER THAN
  if (operation == 5) {
    if (values.length !== 2)
      throw "Expected exacly 2 values - got " + values.length;

    return values[0] > values[1] ? 1 : 0;
  }

  // LESS THAN
  if (operation == 6) {
    if (values.length !== 2)
      throw "Expected exacly 2 values - got " + values.length;

    return values[0] < values[1] ? 1 : 0;
  }

  // EQUAL
  if (operation == 7) {
    if (values.length !== 2)
      throw "Expected exacly 2 values - got " + values.length;

    return values[0] == values[1] ? 1 : 0;
  }

  throw "INVALID OPERATION (TYPE ID)";
}


