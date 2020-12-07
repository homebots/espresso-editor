import { Component, Input } from '@homebots/elements';
import template from './code-output.component.htm';

@Component({
  tag: 'code-output',
  template,
})
export class CodeOutputComponent extends HTMLElement {
  @Input() binary: number[];
  hexadecimal = false;

  get json() {
    const data = this.hexadecimal ? this.binary.map((x) => x.toString(16)) : this.binary;
    return JSON.stringify(data || []);
  }

  get length() {
    return (this.binary && this.binary.length) || 0;
  }
}
