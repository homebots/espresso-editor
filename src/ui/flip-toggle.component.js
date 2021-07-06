var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output } from '@homebots/elements';
import { PersistentToggle } from './persistent-toggle';
const template = `
<button
  class="text-gray-300 hover:bg-gray-700 hover:text-white text-left px-3 py-2 rounded-md text-sm font-medium"
  (click)="this.onToggleClick()">
  <svg class="transform block fill-current" [class.rotate-180]="!this.enabled" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
</button>
`;
let FlipToggleComponent = class FlipToggleComponent extends HTMLElement {
    set name(name) {
        this.toggle = new PersistentToggle(name);
    }
    onToggleClick() {
        this.toggle.toggle();
        this.onToggle.emit(this.toggle.enabled);
    }
    get enabled() {
        var _a;
        return Boolean((_a = this.toggle) === null || _a === void 0 ? void 0 : _a.enabled);
    }
};
__decorate([
    Output('change'),
    __metadata("design:type", Object)
], FlipToggleComponent.prototype, "onToggle", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], FlipToggleComponent.prototype, "name", null);
FlipToggleComponent = __decorate([
    Component({
        tag: 'x-flip-toggle',
        template,
    })
], FlipToggleComponent);
export { FlipToggleComponent };
