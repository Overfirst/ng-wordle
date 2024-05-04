import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WordleModule } from './wordle/wordle.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WordleModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
