import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';

/* Пайп для получения разрешения на поворот буквы обратной стороной */
@Pipe({
  name: 'wordleRowCanFlip',
  pure: false,
})
export class WordleRowCanFlipPipe implements PipeTransform {
  constructor(private readonly wordleState: WordleStateService) {}

  public transform(rowIndex: number): boolean {
    return !!this.wordleState.wordRows[rowIndex];
  }
}
