export function flatten<T>(array: T[]): T[] {
  return array.reduce((stack, item) => {
    if (Array.isArray(item)) {
      return stack.concat(item);
    }

    return stack.concat([item]);
  }, []);
}

/*

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

*/
