import { ChangeDetector, ChangeDetectorRef, Child, Component, Inject, OnInit } from '@homebots/elements';
import { Compiler } from '../code-compiler/compiler';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import template from './app.component.htm';

function debounce(time: number, fn) {
  let timer;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), time);
  };
}

@Component({
  tag: 'app-root',
  shadowDom: false,
  template,
})
export class AppComponent extends HTMLElement implements OnInit {
  @Inject(Compiler) compiler: Compiler;
  @Inject(ChangeDetectorRef) cd: ChangeDetector;
  @Child('app-code-editor') editor: CodeEditorComponent;

  private socket: WebSocket;

  output: number[] = [];
  errorMessage = '';

  get outputJson() {
    return this.output ? JSON.stringify(this.output, null, 2) : '';
  }

  compile(code: string) {
    try {
      this.output = this.compiler.compile(code);
    } catch (error) {
      if (error.location) {
        this.errorMessage = 'Line ' + error.location.start.line + ': ' + error.message;
      } else {
        this.errorMessage = String(error);
      }
    }

    this.cd.markAsDirtyAndCheck();
  }

  onInit() {
    this.connect();
    this.compile = debounce(200, this.compile);
  }

  onCodeChange(event: CustomEvent<string>) {
    const code = event.detail;
    this.output = [];
    this.errorMessage = '';

    if (!code) return;

    this.compile(code);
  }

  onRun() {
    if (this.socket.readyState !== this.socket.OPEN || !this.output.length) {
      return;
    }

    const message = new Uint8Array(this.output);
    this.socket.send(message);
  }

  connect() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    this.socket = new WebSocket(`${protocol}//hub.homebots.io/hub/display`);
    this.socket.onmessage = ({ data }) => console.log(data);
    this.socket.onopen = () => this.socket.send('text');
    this.socket.onclose = () => setTimeout(() => this.connect(), 3000);
  }
}
