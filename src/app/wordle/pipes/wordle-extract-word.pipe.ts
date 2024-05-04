import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';
import { WordleWord } from '../model/wordle.model';

/* Пайп для извлечения буквы в каждой строке игры */
@Pipe({
  name: 'wordleExtractWord',
  pure: false,
})
export class WordleExtractWordPipe implements PipeTransform {
  constructor(private readonly wordleState: WordleStateService) {}

  public transform(rowIndex: number): WordleWord | null {
    return (
      (rowIndex === this.wordleState.wordRows.length
        ? this.wordleState.inputWord
        : this.wordleState.wordRows[rowIndex]) ?? null
    );
  }
}
