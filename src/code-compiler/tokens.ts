import {
  c_copy,
  c_debug,
  c_dec,
  c_delay,
  c_delay_v,
  c_dump,
  c_halt,
  c_inc,
  c_ioallout,
  c_iomode,
  c_ioread,
  c_iotype,
  c_iowrite,
  c_jump,
  c_jumpif,
  c_memget,
  c_memset,
  c_noop,
  c_not,
  c_print,
  c_push_b,
  c_push_i,
  c_restart,
  c_sysinfo,
  c_yield,
} from './constants';

export type int32 = [number, number, number, number];

export class Reference {
  create = false;
  private _reference: number = -1;

  get reference() {
    if (this._reference === -1) {
      throw new ReferenceError(`Undefined reference: ${this.name}`);
    }

    return this._reference;
  }

  set reference(value: number) {
    this._reference = value;
  }

  constructor(public name: string) {}
}

export class CreateReference extends Reference {
  create = true;
}

export class Node {
  get bytes(): number[] {
    return [];
  }

  length = 0;

  constructor(props?: Record<string, any>) {
    Object.assign(this, props);
  }
}

export class CreateReferenceNode {
  constructor(public name: string) {}
}

export class LabelNode extends Node {
  label: string;
}

export class SkipNode extends Node {}

export class NoopNode extends Node {
  get bytes() {
    return [c_noop];
  }
  readonly length = 1;
}

export class HaltNode extends Node {
  get bytes() {
    return [c_halt];
  }
  readonly length = 1;
}

export class SysInfoNode extends Node {
  get bytes() {
    return [c_sysinfo];
  }
  readonly length = 1;
}

export class DumpNode extends Node {
  get bytes() {
    return [c_dump];
  }
  readonly length = 1;
}

export class RestartNode extends Node {
  get bytes() {
    return [c_restart];
  }
  readonly length = 1;
}

export class YieldNode extends Node {
  get bytes() {
    return [c_yield];
  }
  readonly length = 1;
}

export class DebugNode extends Node {
  readonly length = 2;
  value: number;

  get bytes() {
    return [c_debug, this.value];
  }
}

export class IoReadNode extends Node {
  readonly length = 3;
  readonly variable: Reference;
  readonly pin: number;

  get bytes() {
    return [c_ioread, this.variable.reference, this.pin];
  }
}

export class IoWriteNode extends Node {
  readonly length = 3;
  readonly variable: Reference;
  readonly pin: number;

  get bytes() {
    return [c_iowrite, this.pin, this.variable.reference];
  }
}

export class IoModeNode extends Node {
  readonly length = 3;
  readonly variable: Reference;
  readonly pin: number;

  get bytes() {
    return [c_iomode, this.pin, this.variable.reference];
  }
}

export class IoTypeNode extends Node {
  readonly length = 3;
  readonly variable: Reference;
  readonly pin: number;

  static pins = {
    0: { io: 0 },
    1: { tx: 0, io: 3 },
    2: { io: 0 },
    3: { rx: 0, io: 3 },
  };

  static ofType(pin: number, type: 'io' | 'tx' | 'rx') {
    const pinTypes = this.pins[pin];
    if (pinTypes[type] !== undefined) {
      return pinTypes[type];
    }

    return 0;
  }

  get bytes() {
    return [c_iotype, this.pin, this.variable.reference];
  }
}

export class PushIntegerNode extends Node {
  readonly length = 6;
  readonly variable: Reference;
  readonly value: int32;

  get bytes() {
    return [c_push_i, this.variable.reference, ...this.value];
  }
}

export class PushByteNode extends Node {
  readonly length = 3;
  readonly variable: Reference;
  readonly value: number;

  get bytes() {
    return [c_push_b, this.variable.reference, this.value];
  }
}

export class CopyNode extends Node {
  readonly length = 3;
  readonly target: Reference;
  readonly source: Reference;

  get bytes() {
    return [c_copy, this.target.reference, this.source.reference];
  }
}

export class DelayNode extends Node {
  readonly length = 5;
  delay: int32;

  get bytes() {
    return [c_delay, ...this.delay];
  }
}

export class DelayVariableNode extends Node {
  readonly length = 2;
  variable: Reference;

  get bytes() {
    return [c_delay_v, this.variable.reference];
  }
}

export class IoAllOutputNode extends Node {
  readonly length = 1;

  get bytes() {
    return [c_ioallout];
  }
}

export class NotNode extends Node {
  readonly length = 2;
  variable: Reference;

  get bytes() {
    return [c_not, this.variable.reference];
  }
}

export class IncrementNode extends Node {
  readonly length = 2;
  variable: Reference;

  get bytes() {
    return [c_inc, this.variable.reference];
  }
}

export class DecrementNode extends Node {
  readonly length = 2;
  variable: Reference;

  get bytes() {
    return [c_dec, this.variable.reference];
  }
}

export class LabelReferenceNode extends Node {
  label: string;
  address: int32;
}

export class JumpNode extends Node {
  readonly length = 5;
  label: LabelReferenceNode;

  get bytes() {
    if (!this.label.address) {
      throw new ReferenceError(`Undefined address for ${this.label.label}`);
    }

    return [c_jump, ...this.label.address];
  }
}

export class JumpIfNode extends Node {
  readonly length = 6;
  label: LabelReferenceNode;
  variable: Reference;

  get bytes() {
    if (!this.label.address) {
      throw new ReferenceError(`Undefined address for ${this.label.label}`);
    }

    return [c_jumpif, this.variable.reference, ...this.label.address];
  }
}

export class PrintNode extends Node {
  readonly length = 5;
  string: number[];

  get bytes() {
    return [c_print, ...this.string];
  }
}

export class ByteNode extends Node {
  rawBinary: number[];

  get bytes() {
    return this.rawBinary;
  }

  // @ts-ignore
  get length() {
    return this.rawBinary.length;
  }

  set length(_) {}
}

export class MemoryReadNode extends Node {
  variable: Reference;
  address: int32;

  readonly length = 6;

  get bytes() {
    return [c_memget, this.variable.reference, ...this.address];
  }
}

export class MemoryWriteNode extends Node {
  variable: Reference;
  address: int32;

  readonly length = 6;

  get bytes() {
    return [c_memset, ...this.address, this.variable.reference];
  }
}
