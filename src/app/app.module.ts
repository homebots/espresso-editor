import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CodeDocsComponent } from './code-docs/code-docs.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CodeOutputComponent } from './code-output/code-output.component';
import { BinaryToggleComponent } from './ui/binary-toggle.component';
import { FlipToggleComponent } from './ui/flip-toggle.component';
import { PageDividerComponent } from './ui/page-divider.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeDocsComponent,
    CodeEditorComponent,
    CodeOutputComponent,
    PageDividerComponent,
    FlipToggleComponent,
    BinaryToggleComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
