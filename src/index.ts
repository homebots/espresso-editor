import { bootstrap, ChangeDetectorRef, ReactiveChangeDetector } from '@homebots/elements';

export { CodeEditorComponent } from './code-editor/code-editor.component.ts';
export { AppComponent } from './app/app.component.ts';

bootstrap({
  providers: [{ type: ChangeDetectorRef, useClass: ReactiveChangeDetector }],
});
