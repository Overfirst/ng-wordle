import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';
import { WORDLE_WORD_COLLECTION } from '../const/wordle-collection.const';
import { WordleLetter } from '../model/wordle.model';

@Pipe({
  name: 'wordleCheckWordExists',
  pure: false,
})
export class WordleCheckWordExistsPipe implements PipeTransform {
  constructor(private readonly wordleState: WordleStateService) {}

  public transform(rowIndex: number): boolean {
    if (rowIndex !== this.wordleState.wordRows.length) {
      return true;
    }

    if (this.wordleState.inputWord.length < this.wordleState.wordLength) {
      return true;
    }

    return WORDLE_WORD_COLLECTION[this.wordleState.wordLength].includes(
      this.wordleState.inputWord
        .map((letter: WordleLetter) => letter.letter)
        .join(''),
    );
  }
}
