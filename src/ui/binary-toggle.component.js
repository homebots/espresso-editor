var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
let BinaryToggleComponent = class BinaryToggleComponent extends HTMLElement {
    constructor() {
        super(...arguments);
        this.change = new DomEventEmitter(this, 'change');
        this.labelon = '';
        this.labeloff = '';
    }
    set value(value) {
        this.toggleState.toggle(!!value);
    }
    set name(name) {
        this.toggleState = new PersistentToggle(name);
        this.change.emit(this.toggleState.enabled);
    }
    get enabled() {
        return this.toggleState.enabled;
    }
    onToggleClick(value) {
        this.toggleState.toggle(value);
        this.change.emit(this.toggleState.enabled);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], BinaryToggleComponent.prototype, "labelon", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], BinaryToggleComponent.prototype, "labeloff", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], BinaryToggleComponent.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], BinaryToggleComponent.prototype, "name", null);
BinaryToggleComponent = __decorate([
    Component({
        tag: 'x-binary-toggle',
        template,
    })
], BinaryToggleComponent);
export { BinaryToggleComponent };
