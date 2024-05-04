import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleComponent } from './wordle.component';
import { WordleExtractLetterPipe } from './pipes/wordle-extract-letter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [WordleComponent],
  declarations: [WordleComponent, WordleExtractLetterPipe],
  exports: [WordleComponent],
})
export class WordleModule {}
