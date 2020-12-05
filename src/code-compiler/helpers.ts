import { c_jump, c_jumpif } from './constants';

export * from './constants';
/*

const $skip = Symbol('skip');
const varNames = new Map();
const labelLocations = new Map();
const t_label = 1;
const t_op = 2;
const t_jump = 3;

const pinModes = {
  input: 0,
  output: 1,
  'open drain': 3,
  'input pull-up': 4,
};

const ioTypes = {
  0: 0,
  1: 3,
  2: 0,
  3: 3,
};

export function zeroPad(s) {
  return (s.length === 1 ? '0' : '') + s;
}

export function parseHex(x) {
  return parseInt(x, 16);
}
export function parseInt32(hex) {
  return hex
    .split(' ')
    .map(parseHex)
    .map((n, i) => n << (8 * (3 - i)))
    .reduce((a, n) => new Uint32Array([n])[0] + a, 0);
}
export function toInt32Hex(number) {
  return toInt32(number).map((x) => zeroPad(x.toString(16)));
}
export function toInt32(number) {
  return Array.from(new Uint8Array(new Uint32Array([number]).buffer));
}
export function skip() {
  return $skip;
}
export function createNode(type, value, length, extraProperties = {}) {
  return { type, size: length, value, ...extraProperties };
}
export function opcode(value) {
  return createNode(t_op, value, value.length);
}

export function jumpTo(label) {
  return createNode(t_jump, [c_jump], 0, { label: label.value });
}

export function jumpIf(variable, label) {
  return createNode(t_jump, [c_jumpif, variable], 0, { label: label.value });
}

export function countBytesUntil(array, index) {
  return array.slice(0, index).reduce((total, node) => total + node.size, 0);
}
export function getOrCreateVarName(name) {
  if (!varNames.has(name)) {
    console.log(name, varNames.size);
    varNames.set(name, varNames.size);
  }

  return varNames.get(name);
}

export function getVarName(name) {
  if (!varNames.has(name)) {
    throw new Error('Variable "' + name + '" not declared');
  }

  return varNames.get(name);
}

export function concatenate(stack, item) {
  return stack.concat(item.value);
}

export function findLabels(context) {
  return (item, index) => {
    if (item.type === t_label) {
      context.labelLocations.set(item.value, index);
      return;
    }

    return item;
  };
}

export function addLabelJumps(context) {
  return (item, _, array) => {
    if (item.type === t_jump) {
      const location = context.labelLocations.get(item.label);
      const offset = countBytesUntil(array, location);
      const bytes = toInt32(offset);
      item.value = item.value.concat(bytes);
      item.type = t_op;
    }

    return item;
  };
}

export function compile(stream: any[]) {
  labelLocations.clear();

  const context = {
    labelLocations,
    stream,
    byteCounter: 0,
  };

  return stream
    .filter((x) => x !== $skip)
    .map(findLabels(context))
    .filter(Boolean)
    .map(addLabelJumps(context))
    .reduce(concatenate, []);
}
*/
