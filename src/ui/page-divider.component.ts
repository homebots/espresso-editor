import { Component, Input } from '@homebots/elements';

const template = `
<style>
x-page-divider {

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

x-page-divider[mode="vertical"] {
  width: 0.5rem;
}

x-page-divider[mode="horizontal"] {
  height: 0.5rem;
}

</style>
`;

@Component({
  tag: 'x-page-divider',
  template,
})
export class PageDividerComponent extends HTMLElement {
  @Input() set mode(value: 'horizontal' | 'vertical') {
    this.setAttribute('mode', value);
  }
}
