export type NodeType = 'label' | 'opcode' | 'jump';
export class Node {
  type: NodeType;
  bytes: number[] = [];
  [key: string]: any;

  constructor(props: Record<string, any>) {
    Object.assign(this, props);
  }
}

export class LabelNode extends Node {
  label: string;
  bytes = [];
}
