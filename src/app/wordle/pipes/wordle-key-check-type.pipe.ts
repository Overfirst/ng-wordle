import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';
import { WordleLetterType } from '../model/wordle.model';

/* Пайп для извлечения буквы в каждой строке игры */
@Pipe({
  name: 'wordleKeyCheckType',
  pure: false,
})
export class WordleKeyCheckTypePipe implements PipeTransform {
  constructor(private readonly wordleState: WordleStateService) {}

  public transform(key: string, type: WordleLetterType): boolean {
    return this.wordleState.wordleKeyboardKeyTypes[key] === type;
  }
}
