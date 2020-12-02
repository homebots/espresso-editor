import { Child, Component, Inject, OnInit } from '@homebots/elements';
import { Compiler } from '../code-compiler/compiler';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import template from './app.component.htm';

function zeroPad(s) {
  return (s.length === 1 ? '0' : '') + s;
}
function toHex(buffer) {
  return Array.from(buffer).map((byte: number) => zeroPad(byte.toString(16)));
}

const instructions = `
const uint8_t c_halt = 0xfe;           // -
const uint8_t c_sysinfo = 0xfd;        // -
const uint8_t c_restart = 0xfc;        // -
const uint8_t c_debug = 0xfb;          // -
const uint8_t c_yield = 0xfa;          // -
const uint8_t c_noop = 0x01;           // -
const uint8_t c_delay = 0x02;          // uint32 delay
const uint8_t c_print = 0x03;          // uint8[] message
const uint8_t c_jump = 0x04;           // uint32 address
const uint8_t c_memget = 0x05;         // uint8 slot, int32 address
const uint8_t c_memset = 0x06;         // uint8 slot, int32 address
const uint8_t c_push_b = 0x07;         // uint8 slot, int8 value
const uint8_t c_push_i = 0x08;         // uint8 slot, int32 value
const uint8_t c_gt = 0x09;             // uint8 slot, uint8 b, uint8 b
const uint8_t c_gte = 0x0a;            // uint8 slot, uint8 b, uint8 b
const uint8_t c_lt = 0x0b;             // uint8 slot, uint8 b, uint8 b
const uint8_t c_lte = 0x0c;            // uint8 slot, uint8 b, uint8 b
const uint8_t c_equal = 0x0d;          // uint8 slot, uint8 b, uint8 b
const uint8_t c_notequal = 0x0e;       // uint8 slot, uint8 b, uint8 b
const uint8_t c_jumpif = 0x0f;         // uint8 slot, uint32 address
const uint8_t c_xor = 0x10;            // uint8 slot, uint8 a, uint8 b
const uint8_t c_and = 0x11;            // uint8 slot, uint8 a, uint8 b
const uint8_t c_or = 0x12;             // uint8 slot, uint8 a, uint8 b
const uint8_t c_not = 0x13;            // uint8 slot, uint8 a
const uint8_t c_inc = 0x14;            // uint8 slot
const uint8_t c_dec = 0x15;            // uint8 slot
const uint8_t c_add = 0x16;            // uint8 slot, uint8 slot
const uint8_t c_sub = 0x17;            // uint8 slot, uint8 slot
const uint8_t c_mul = 0x18;            // uint8 slot, uint8 slot
const uint8_t c_div = 0x19;            // uint8 slot, uint8 slot
const uint8_t c_mod = 0x1a;            // uint8 slot, uint8 slot
const uint8_t c_iowrite = 0x31;        // uint8 pin, uint8 slot
const uint8_t c_ioread = 0x32;         // uint8 slot, uint8 pin
const uint8_t c_iomode = 0x35;         // uint8 pin, uint8 slot
const uint8_t c_iotype = 0x36;         // uint8 pin, uint8 slot
const uint8_t c_wificonnect = 0x3a;    // uint8 pin, uint8 slot
const uint8_t c_wifidisconnect = 0x3b; // uint8 pin, uint8 slot
const uint8_t c_wifistatus = 0x3c;     // uint8 pin, uint8 slot
const uint8_t c_wifilist = 0x3e;       // uint8 pin, uint8 slot
const uint8_t c_sleep = 0x3f;          // uint8 mode, uint32 time
const uint8_t c_i2setup = 0x40;        // -
const uint8_t c_i2start = 0x41;        // -
const uint8_t c_i2stop = 0x42;         // -
const uint8_t c_i2write = 0x43;        // uint8 byte
const uint8_t c_i2read = 0x44;         // uint8 slot
const uint8_t c_i2setack = 0x45;       // uint8 byte
const uint8_t c_i2getack = 0x46;       // uint8 byte
const uint8_t c_i2find = 0x48;         // uint8 slot
const uint8_t c_i2writeack = 0x49;     // uint32 length, uint* bytes
const uint8_t c_i2writeack_b = 0x4a;   // uint8 byte
`;
@Component({
  tag: 'app-root',
  shadowDom: false,
  template,
})
export class AppComponent extends HTMLElement implements OnInit {
  private socket: WebSocket;
  private compileTimer: any;

  @Inject(Compiler)
  compiler: Compiler;

  @Child('app-code-editor')
  editor: CodeEditorComponent;

  output = '';

  onInit() {
    this.connect();
  }

  onCodeChange(event: CustomEvent<string>) {
    const code = event.detail;
    clearTimeout(this.compileTimer);

    if (!code) return;

    this.compileTimer = setTimeout(() => this.compileAndShow(event.detail), 1000);
  }

  onRun() {
    if (this.socket.readyState !== this.socket.OPEN) {
      return;
    }
    const saninitizedInput = this.editor.value;
    const code = 'return ' + saninitizedInput;
    const bytes = Function(code)();
    const message = new Uint8Array(bytes);

    if (message.length) {
      this.socket.send(message);
    }
  }

  compileAndShow(code: string) {
    // this.output = code;
    const buffer = this.compiler.compile(code);
    this.output = Array.from(buffer).join('\n');
  }

  connect() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    this.socket = new WebSocket(`${protocol}//hub.homebots.io/hub/display`);
    this.socket.onmessage = ({ data }) => console.log(data);
    this.socket.onopen = () => this.socket.send('text');
    this.socket.onclose = () => setTimeout(() => this.connect(), 3000);
  }
}
