import { Component } from '@homebots/elements';
import { PersistentToggle } from '../ui/persistent-toggle';
import template from './code-docs.component.htm';

@Component({
  tag: 'code-docs',
  template,
})
export class CodeDocsComponent extends HTMLElement {
  basicMode = new PersistentToggle('mode');
}
