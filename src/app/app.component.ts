import { ChangeDetector, ChangeDetectorRef, Child, Component, Inject, OnInit } from '@homebots/elements';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { FlipToggleComponent } from '../ui/flip-toggle.component';
import template from './app.component.htm';
import examples from './examples/examples';
import { Compiler } from '@homebots/espresso';

// function debounce(time: number, fn) {
//   let timer;
//   return function (...args: any[]) {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn.apply(this, args), time);
//   };
// }

@Component({
  tag: 'app-root',
  template,
})
export class AppComponent extends HTMLElement implements OnInit {
  private socket: WebSocket;

  @Inject(Compiler) espresso: Compiler;
  @Inject(ChangeDetectorRef) cd: ChangeDetector;

  @Child('code-editor', true) editor: CodeEditorComponent;
  @Child('x-flip-toggle') sidebarToggle: FlipToggleComponent;

  get showSidebar() {
    return this.sidebarToggle && this.sidebarToggle.enabled;
  }

  program: any[] = [];
  errorMessage = '';
  examples = examples;

  onInit() {
    this.connectWebSocket();
  }

  onCodeChange() {
    const code = this.editor.value.trim();

    if (code) {
      this.compile(code);
    }
  }

  onRun() {
    if (this.socket.readyState !== this.socket.OPEN || !this.program.length) {
      return;
    }

    const message = new Uint8Array(this.program);
    console.log('Sent', message.length);

    this.socket.send(message);
  }

  onExampleSelect($event) {
    const selected = $event.target.value;
    const example = this.examples.find((item) => item.id === selected);

    if (example) {
      this.editor.value = example.code;
    }
  }

  private connectWebSocket() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    this.socket = new WebSocket(`${protocol}//hub.homebots.io/hub/display`);
    this.socket.onmessage = ({ data }) => console.log(data);
    this.socket.onopen = () => this.socket.send('text');
    this.socket.onclose = () => setTimeout(() => this.connectWebSocket(), 3000);
  }

  private compile(code: string) {
    try {
      this.program = this.espresso.compile(code);
      this.errorMessage = '';
    } catch (error) {
      this.program = [];

      if (error.location) {
        this.errorMessage =
          'Line ' + error.location.start.line + ',' + error.location.start.column + ': ' + error.message;
      } else {
        this.errorMessage = String(error);
      }

      console.error(error);
    }

    this.cd.markAsDirtyAndCheck();
  }
}
