import { bootstrap, ChangeDetectorRef, ReactiveChangeDetector } from '@homebots/elements';

export { CodeEditorComponent } from './code-editor/code-editor.component';
export { AppComponent } from './app/app.component';

bootstrap({
  providers: [{ type: ChangeDetectorRef, useClass: ReactiveChangeDetector }],
});
