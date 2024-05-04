import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';

/* Пайп для извлечения буквы в каждой строке игры */
@Pipe({
  name: 'wordleExtractLetter',
  pure: false,
})
export class WordleExtractLetterPipe implements PipeTransform {
  constructor(private readonly wordleState: WordleStateService) {}

  public transform(rowIndex: number, letterIndex: number): string {
    return rowIndex === this.wordleState.wordRows.length
      ? this.wordleState.inputWord[letterIndex]?.letter
      : this.wordleState.wordRows[rowIndex]?.[letterIndex]?.letter;
  }
}
