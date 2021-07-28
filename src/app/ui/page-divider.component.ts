import { Component, ElementRef, Input } from '@angular/core';

const styles = `
:host {
  background-image: linear-gradient(
    45deg,
    var(--stripes-color) 12.5%,
    transparent 12.5%,
    transparent 50%,
    var(--stripes-color) 50%,
    var(--stripes-color) 62.5%,
    transparent 62.5%,
    transparent 100%
  );
  background-size: 5.66px 5.66px;
}

:host[mode="vertical"] {
  width: 0.5rem;
}

:host[mode="horizontal"] {
  height: 0.5rem;
}
`;
@Component({
  selector: 'app-page-divider',
  styles: [styles],
  template: '<span></span>',
})
export class PageDividerComponent {
  constructor(private el: ElementRef) {}

  @Input() set mode(value: 'horizontal' | 'vertical') {
    this.el.nativeElement.setAttribute('mode', value);
  }
}
