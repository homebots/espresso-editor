import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersistentToggle } from './persistent-toggle';

const template = `
  <div class="flex">
    <button
      class="text-gray-300 border border-solid border-gray-700 hover:bg-gray-700 hover:text-white text-left px-3 py-1 rounded-md rounded-r-none text-sm font-medium"
      [class.bg-gray-700]="enabled"
      (click)="onToggleClick(true)"
      [innerHTML]="labelon"
    ></button>
    <button
      class="text-gray-300 border border-solid border-gray-700 hover:bg-gray-700 hover:text-white text-left px-3 py-1 rounded-md rounded-l-none text-sm font-medium"
      [class.bg-gray-700]="!enabled"
      (click)="onToggleClick(false)"
      [innerHTML]="labeloff"
    ></button>
  </div>
`;

@Component({
  selector: 'app-binary-toggle',
  template,
})
export class BinaryToggleComponent {
  toggleState = new PersistentToggle('');

  @Output('change') readonly onChange = new EventEmitter<boolean>();
  @Input() labelon: string = '';
  @Input() labeloff: string = '';

  @Input() set value(value: boolean) {
    this.toggleState.toggle(!!value);
  }

  @Input() set name(name: string) {
    this.toggleState = new PersistentToggle(name);
  }

  get enabled() {
    return this.toggleState.enabled;
  }

  onToggleClick(value: boolean) {
    this.toggleState.toggle(value);
    this.emitEvent();
  }

  ngOnInit() {
    this.emitEvent();
  }

  protected emitEvent() {
    setTimeout(() => this.onChange.emit(this.toggleState.enabled));
  }
}
