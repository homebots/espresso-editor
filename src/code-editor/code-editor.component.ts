import { Component, EventEmitter, Input, Output } from '@homebots/elements';
import styles from './code-editor.component.css';

export interface EditorError {
  line: number;
  message: string;
}

@Component({
  tag: 'app-code-editor',
  styles,
})
export class CodeEditorComponent extends HTMLElement {
  @Output('change')
  readonly onChange: EventEmitter<string>;

  @Input()
  mode: string = 'javascript';

  @Input()
  errors: EditorError[];

  get value(): string {
    return this.editor.getValue();
  }

  private editor: any;

  onInit() {
    this.createEditor();
  }

  // private updateErrors() {
  //   this.errorWidgets.forEach((widget) => this.editor.removeLineWidget(widget));
  //   this.errorWidgets.length = 0;

  //   if (!this.errors?.length) return;

  //   this.errors.forEach((error) => {
  //     const message = document.createElement('div');
  //     message.appendChild(document.createTextNode(error.message));
  //     this.errorWidgets.push(
  //       this.editor.addLineWidget(error.line - 1, message, { coverGutter: false, noHScroll: true }),
  //     );
  //   });
  // }

  createEditor() {
    this.editor = (self as any).CodeMirror(this, {
      mode: this.mode,
      theme: 'monokai',
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
