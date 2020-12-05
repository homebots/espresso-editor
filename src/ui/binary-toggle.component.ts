import { Component, EventEmitter, Input, Output } from '@homebots/elements';

const template = `
<div class="flex">
    <button
      class="text-gray-300 border border-solid border-gray-800 hover:bg-gray-700 hover:text-white text-left px-3 py-2 rounded-md rounded-r-none text-sm font-medium"
      [class.bg-gray-700]="this._value ===  true"
      (click)="this.toggle(true)"
      [innerHTML]="this.labelon"
    ></button>
    <button
      class="text-gray-300 border border-solid border-gray-800 hover:bg-gray-700 hover:text-white text-left px-3 py-2 rounded-md rounded-l-none text-sm font-medium"
      [class.bg-gray-700]="this._value === false"
      (click)="this.toggle(false)"
      [innerHTML]="this.labeloff"
    ></button>
  </div>
`;

@Component({
  tag: 'x-binary-toggle',
  template,
})
export class BinaryToggleComponent extends HTMLElement {
  _value = false;

  @Output('toggle') onToggle: EventEmitter<boolean>;
  @Input() labelon: string = '';
  @Input() labeloff: string = '';

  @Input() set value(v: boolean) {
    this._value = !!v;
  }

  toggle(value: boolean) {
    this.onToggle.emit(value);
  }
}
