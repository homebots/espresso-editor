import { Component, EventEmitter, Input, Output } from '@homebots/elements';
import styles from './code-editor.component.css';

export interface EditorError {
  line: number;
  message: string;
}

@Component({
  tag: 'code-editor',
  styles,
})
export class CodeEditorComponent extends HTMLElement {
  @Output('change')
  readonly onChange: EventEmitter<string>;

  @Input()
  mode: string = 'javascript';

  get value(): string {
    return this.editor.getValue();
  }

  set value(code: string) {
    if (this.value !== code) {
      this.editor.setValue(code);
    }
  }

  private editor: any;

  onInit() {
    this.createEditor();
  }

  createEditor() {
    this.editor = (self as any).CodeMirror(this, {
      mode: this.mode,
      theme: 'dracula',
      lineNumbers: true,
      autofocus: true,
      autocorrect: true,
    });

    this.editor.on('change', (editor) => {
      const code = editor.getValue();
      localStorage.setItem('code', code);
      this.emitCode(code);
    });

    const code = localStorage.getItem('code') || '';
    if (code) {
      this.editor.setValue(code);
      setTimeout(() => this.emitCode(code), 1000);
    }
  }

  private emitCode(code: string) {
    this.onChange.emit(code);
  }
}
