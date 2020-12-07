import { bootstrap, ShadowDomToggle } from '@homebots/elements';

export { AppComponent } from './app/app.component';
export { CodeEditorComponent } from './code-editor/code-editor.component';
export { CodeDocsComponent } from './code-docs/code-docs.component';
export { BinaryToggleComponent } from './ui/binary-toggle.component';
export { FlipToggleComponent } from './ui/flip-toggle.component';
export { PageDividerComponent } from './ui/page-divider.component';
export { CodeOutputComponent } from './code-output/code-output.component';

const noShadowDom = new ShadowDomToggle();
noShadowDom.disable();

bootstrap({
  providers: [{ type: ShadowDomToggle, useValue: noShadowDom }],
});
