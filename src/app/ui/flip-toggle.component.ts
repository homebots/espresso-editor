import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersistentToggle } from './persistent-toggle';

const template = `
  <button
    class="text-gray-300 hover:bg-gray-700 hover:text-white text-left px-3 py-2 rounded-md text-sm font-medium"
    (click)="onToggleClick()">
    <svg class="transform block fill-current" [class.rotate-180]="!enabled" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
  </button>
`;

@Component({
  selector: 'app-flip-toggle',
  template,
})
export class FlipToggleComponent {
  toggle = new PersistentToggle('');

  @Output('change') readonly onToggle = new EventEmitter<boolean>();

  @Input() set name(name: string) {
    this.toggle = new PersistentToggle(name);
  }

  onToggleClick() {
    this.toggle.toggle();
    this.emitEvent();
  }

  get enabled() {
    return Boolean(this.toggle.enabled);
  }

  ngAfterContentInit() {
    this.emitEvent();
  }

  protected emitEvent() {
    setTimeout(() => this.onToggle.emit(this.toggle.enabled));
  }
}
