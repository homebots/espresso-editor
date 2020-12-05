import { bootstrap, ShadowDomToggle } from '@homebots/elements';

export { AppComponent } from './app/app.component';
export { CodeEditorComponent } from './code-editor/code-editor.component';
export { BinaryToggleComponent } from './ui/binary-toggle.component';

const noShadowDom = new ShadowDomToggle();
noShadowDom.disable();

bootstrap({
  providers: [{ type: ShadowDomToggle, useValue: noShadowDom }],
});
