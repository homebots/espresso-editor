import { Child, Component, EventEmitter, Output } from '@homebots/elements';
import template from './code-editor.component.htm';

@Component({
  tag: 'app-code-editor',
  shadowDom: false,
  template,
})
export class CodeEditorComponent extends HTMLElement {
  @Output('change')
  readonly onChange: EventEmitter<string>;

  @Output('run')
  readonly onRun: EventEmitter<string>;

  @Child('.container', true)
  readonly container: HTMLElement;

  get value(): string {
    return this.editor.getValue();
  }

  private editor: any;

  onInit() {
    this.createEditor();
  }

  createEditor() {
    this.editor = (self as any).CodeMirror(this.container, {
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      autofocus: true,
      autocorrect: true,
    });

    this.editor.setValue(localStorage.getItem('code') || '');

    this.editor.on('change', (editor) => {
      const code = editor.getValue();
      localStorage.setItem('code', code);
      this.onChange.emit(code);
    });
  }

  onRunClick() {
    const code: string = this.editor.getValue();
    this.onRun.emit(code);
  }
}
