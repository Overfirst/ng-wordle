import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleComponent } from './wordle.component';
import { CommonPipesModule } from '@common/pipes';

import { WordleExtractWordPipe } from './pipes/wordle-extract-word.pipe';
import { WordleCellIsFilledPipe } from './pipes/wordle-cell-is-filled.pipe';
import { WordleCursorInCellPipe } from './pipes/wordle-cursor-in-cell.pipe';
import { WordleRowCanFlipPipe } from './pipes/wordle-row-can-flip.pipe';
import { WordleExtractLetterPipe } from './pipes/wordle-extract-letter.pipe';
import { WordleExtractAnimationDelayPipe } from './pipes/wordle-extract-animation-delay.pipe';

@NgModule({
  imports: [CommonModule, CommonPipesModule],
  declarations: [
    WordleComponent,
    WordleExtractWordPipe,
    WordleCellIsFilledPipe,
    WordleCursorInCellPipe,
    WordleRowCanFlipPipe,
    WordleExtractLetterPipe,
    WordleExtractAnimationDelayPipe,
  ],
  exports: [WordleComponent],
  providers: [WordleExtractWordPipe, WordleRowCanFlipPipe],
})
export class WordleModule {}
