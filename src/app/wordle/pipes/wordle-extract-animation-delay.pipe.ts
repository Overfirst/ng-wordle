import { Pipe, PipeTransform } from '@angular/core';
import { WordleStateService } from '../services/wordle-state.service';
import { WordleRowCanFlipPipe } from './wordle-row-can-flip.pipe';

@Pipe({
  name: 'wordleExtractAnimationDelay',
  pure: false,
})
export class WordleExtractAnimationDelayPipe implements PipeTransform {
  constructor(
    private readonly wordleCanFlipPipe: WordleRowCanFlipPipe,
    private readonly wordleState: WordleStateService,
  ) {}

  public transform(rowIndex: number, letterIndex: number): string {
    const canFlip: boolean = this.wordleCanFlipPipe.transform(rowIndex);
    return `${canFlip ? this.wordleState.letterFlipDelay * letterIndex : 0}ms`;
  }
}
