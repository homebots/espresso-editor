import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-output',
  templateUrl: './code-output.component.html',
})
export class CodeOutputComponent {
  hexadecimal = false;

  @Input() binary: number[] = [];

  get json() {
    const data = this.hexadecimal
      ? this.binary.map((x) => this.zeroPad(x.toString(16))).join(' ')
      : JSON.stringify(this.binary);

    return data;
  }

  zeroPad(num: string) {
    return num.length < 2 ? '0' + num : num;
  }

  get length() {
    return (this.binary && this.binary.length) || 0;
  }

  onToggle($event: any) {
    this.hexadecimal = $event;
  }
}
