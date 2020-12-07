import { Component, DomEventEmitter, Input } from '@homebots/elements';
import { PersistentToggle } from './persistent-toggle';

const template = `
<div class="flex">
    <button
      class="text-gray-300 border border-solid border-gray-700 hover:bg-gray-700 hover:text-white text-left px-3 py-1 rounded-md rounded-r-none text-sm font-medium"
      [class.bg-gray-700]="this.enabled"
      (click)="this.onToggleClick(true)"
      [innerHTML]="this.labelon"
    ></button>
    <button
      class="text-gray-300 border border-solid border-gray-700 hover:bg-gray-700 hover:text-white text-left px-3 py-1 rounded-md rounded-l-none text-sm font-medium"
      [class.bg-gray-700]="!this.enabled"
      (click)="this.onToggleClick(false)"
      [innerHTML]="this.labeloff"
    ></button>
  </div>
`;

@Component({
  tag: 'x-binary-toggle',
  template,
})
export class BinaryToggleComponent extends HTMLElement {
  toggleState: PersistentToggle;
  change = new DomEventEmitter<boolean>(this, 'change');

  @Input() labelon: string = '';
  @Input() labeloff: string = '';

  @Input() set value(value: boolean) {
    this.toggleState.toggle(!!value);
  }

  @Input() set name(name: string) {
    this.toggleState = new PersistentToggle(name);
    this.change.emit(this.toggleState.enabled);
  }

  get enabled() {
    return this.toggleState.enabled;
  }

  onToggleClick(value: boolean) {
    this.toggleState.toggle(value);
    this.change.emit(this.toggleState.enabled);
  }
}
