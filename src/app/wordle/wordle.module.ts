import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleComponent } from './wordle.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WordleComponent],
  exports: [WordleComponent],
})
export class WordleModule {}
