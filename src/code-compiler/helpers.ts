const MAX_INTEGER = 4294967295;

export function flatten<T>(array: T[]): T[] {
  return array.reduce((stack, item) => {
    if (Array.isArray(item)) {
      return stack.concat(item);
    }

    return stack.concat([item]);
  }, []);
}

export function gpioAddress(pin: number) {
  const GPIO_BASEADDR = 0x60000300;
  const GPIO_PIN0_ADDRESS = 0x28;
  const GPIO_PIN_ADDR = GPIO_BASEADDR + GPIO_PIN0_ADDRESS + pin * 4;

  return GPIO_PIN_ADDR;
}

export function toInt32(number) {
  if (number > MAX_INTEGER) {
    throw new SyntaxError('number is too large');
  }

  return Array.from(new Uint8Array(new Uint32Array([number]).buffer));
}

export function parseInt32(hex: string) {
  return hex
    .split(' ')
    .map((x) => parseInt(x, 16))
    .map((n, i) => n << (8 * (3 - i)))
    .reduce((a, n) => new Uint32Array([n])[0] + a, 0);
}

export function zeroPad(s) {
  return (s.length === 1 ? '0' : '') + s;
}

export function int32ToHex(number: number) {
  return toInt32(number).map((x) => zeroPad(x.toString(16)));
}
