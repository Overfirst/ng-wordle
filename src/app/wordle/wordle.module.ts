import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleComponent } from './wordle.component';
import { CommonPipesModule } from '@common/pipes';
import { WordleExtractWordPipe } from './pipes/wordle-extract-word.pipe';
import { WordleCellIsFilledPipe } from './pipes/wordle-cell-is-filled.pipe';
import { WordleCursorInCellPipe } from './pipes/wordle-cursor-in-cell.pipe';

@NgModule({
  imports: [CommonModule, CommonPipesModule],
  declarations: [
    WordleComponent,
    WordleExtractWordPipe,
    WordleCellIsFilledPipe,
    WordleCursorInCellPipe,
  ],
  exports: [WordleComponent],
  providers: [WordleExtractWordPipe],
})
export class WordleModule {}
