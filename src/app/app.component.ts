import { Component, ViewChild } from '@angular/core';
import { compile } from '@homebots/espresso-compiler';
import { CodeEditorComponent } from './code-editor/code-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected socket!: WebSocket;

  @ViewChild('app-code-editor') editor!: CodeEditorComponent;

  showSidebar = false;
  program: number[] = [];
  errorMessage = '';
  examples = [];

  ngOnInit() {
    this.connectWebSocket();
  }

  onCodeChange(code: string) {
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

  onExampleSelect(_d$event: any) {
    // const selected = $event.target.value;
    // const example = this.examples.find((item) => item.id === selected);
    // if (example) {
    //   this.editor.value = example.code;
    // }
  }

  protected connectWebSocket() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    this.socket = new WebSocket(`${protocol}//hub.homebots.io/hub/display`);
    this.socket.onmessage = ({ data }) => console.log(data);
    this.socket.onopen = () => this.socket.send('text');
    this.socket.onclose = () => setTimeout(() => this.connectWebSocket(), 3000);
  }

  protected compile(code: string) {
    try {
      this.program = compile(code);
      this.errorMessage = '';
    } catch (error) {
      this.program = [];

      if (error.location) {
        this.errorMessage = 'Line ' + error.location.start.line + ': ' + error.message;
      } else {
        this.errorMessage = String(error);
      }

      console.error(error);
    }
  }
}
