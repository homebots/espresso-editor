import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { mode } from '../../../.vscode/espresso.mode';

export interface EditorError {
  line: number;
  message: string;
}

@Component({
  selector: 'app-code-editor',
  styleUrls: ['./code-editor.component.scss'],
  template: '',
})
export class CodeEditorComponent {
  constructor(private ref: ElementRef) {}

  @Output('change') readonly onChange = new EventEmitter<string>();
  @Input() mode: string = 'javascript';

  get value(): string {
    return this.editor?.getValue() ?? '';
  }

  set value(code: string) {
    if (this.value !== code) {
      this.editor?.setValue(code);
    }
  }

  private editor: any;

  ngOnInit() {
    this.createEditor();
  }

  createEditor() {
    this.editor = (self as any).CodeMirror(this.ref.nativeElement, {
      mode: this.mode,
      theme: 'dracula',
      lineNumbers: true,
      autofocus: true,
      autocorrect: true,
    });

    this.editor.on('change', (editor: any) => {
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
    this.onChange.emit(code || '');
  }
}
