import { Pipe, PipeTransform } from '@angular/core';
import { WordleWord } from '../model/wordle.model';
import { WordleExtractWordPipe } from './wordle-extract-word.pipe';

@Pipe({
  name: 'wordleCellIsFilled',
  pure: false,
})
export class WordleCellIsFilledPipe implements PipeTransform {
  constructor(private readonly wordleExtractWordPipe: WordleExtractWordPipe) {}

  public transform(rowIndex: number, letterIndex: number): boolean {
    const word: WordleWord | null =
      this.wordleExtractWordPipe.transform(rowIndex);

    return !!word?.[letterIndex]?.letter;
  }
}
