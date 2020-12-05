import { c_halt, c_noop, c_sysinfo } from './constants';

export type NodeType = 'label' | 'opcode' | 'jump';
export class Node {
  type: NodeType;
  bytes: number[] = [];
  length = 0;
  [key: string]: any;

  constructor(props?: Record<string, any>) {
    Object.assign(this, props);
  }
}

export class LabelNode extends Node {
  label: string;
  bytes = [];
}

export class SkipNode extends Node {}

export class NoopNode extends Node {
  readonly bytes = [c_noop];
  readonly length = 1;
}

export class HaltNode extends Node {
  readonly bytes = [c_halt];
  readonly length = 1;
}

export class SysInfoNode extends Node {
  readonly bytes = [c_sysinfo];
  readonly length = 1;
}
