import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleComponent } from './wordle.component';
import { CommonPipesModule } from '@common/pipes';
import { WordleExtractLetterPipe } from './pipes/wordle-extract-letter.pipe';

@NgModule({
  imports: [CommonModule, CommonPipesModule],
  declarations: [WordleComponent, WordleExtractLetterPipe],
  exports: [WordleComponent],
})
export class WordleModule {}
