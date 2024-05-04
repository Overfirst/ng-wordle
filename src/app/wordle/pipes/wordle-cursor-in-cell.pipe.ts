import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';
import { WordleExtractWordPipe } from './wordle-extract-word.pipe';
import { WordleWord } from '../model/wordle.model';

@Pipe({
  name: 'wordleCursorInCell',
  pure: false,
})
export class WordleCursorInCellPipe implements PipeTransform {
  constructor(
    private readonly wordleState: WordleStateService,
    private readonly wordleExtractWordPipe: WordleExtractWordPipe,
  ) {}

  public transform(rowIndex: number, letterIndex: number): boolean {
    const word: WordleWord | null =
      this.wordleExtractWordPipe.transform(rowIndex);

    return (
      word === this.wordleState.inputWord &&
      letterIndex === this.wordleState.inputWord.length
    );
  }
}
