import { Component } from '@angular/core';
import { PersistentToggle } from '../ui/persistent-toggle';

@Component({
  selector: 'code-docs',
  templateUrl: './code-docs.component.html',
  styleUrls: ['./code-docs.component.scss'],
})
export class CodeDocsComponent {
  basicMode = false;
}
