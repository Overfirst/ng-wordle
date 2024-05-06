import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';
import { WordleLetter, WordleWord } from '../model/wordle.model';

/* Пайп для извлечения буквы в каждой строке игры */
@Pipe({
  name: 'wordleExtractLetter',
  pure: false,
})
export class WordleExtractLetterPipe implements PipeTransform {
  constructor(private readonly wordleState: WordleStateService) {}

  public transform(rowIndex: number, letterIndex: number): WordleLetter | null {
    return (
      (rowIndex === this.wordleState.wordRows.length
        ? this.wordleState.inputWord[letterIndex]
        : this.wordleState.wordRows[rowIndex]?.[letterIndex]) ?? null
    );
  }
}
