import { Component, Input } from '@homebots/elements';
import { zeroPad } from '../../compiler/src/helpers';
import template from './code-output.component.htm';

@Component({
  tag: 'code-output',
  template,
})
export class CodeOutputComponent extends HTMLElement {
  @Input() binary: number[];
  hexadecimal = false;

  get json() {
    const data = this.hexadecimal
      ? this.binary.map((x) => zeroPad(x.toString(16))).join(' ')
      : JSON.stringify(this.binary);
    return data;
  }

  get length() {
    return (this.binary && this.binary.length) || 0;
  }

  onToggle($event) {
    this.hexadecimal = $event.detail;
  }
}
