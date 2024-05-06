import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, tap, merge } from 'rxjs';

import { WordleKeyboard } from './model/wordle.model';
import { WordleStateService } from './services/wordle-state.service';
import { WordleService } from './services/wordle.service';
import { WORDLE_KEYBOARD } from './const/wordle-keyboard.const';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.scss',
  providers: [WordleStateService, WordleService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordleComponent implements OnInit, OnDestroy {
  /* Длина загаданного слова */
  public readonly wordLength$: Observable<number> =
    this.wordleState.wordLength$;

  /* Количество попыток */
  public readonly attemptsCount: number = this.wordleState.attemptsCount;

  /* Клавиатура */
  public readonly WORDLE_KEYBOARD: WordleKeyboard = WORDLE_KEYBOARD;

  public readonly minWordLength: number = this.wordleState.minWordLength;

  public readonly maxWordLength: number = this.wordleState.maxWordLength;

  constructor(
    private readonly wordleState: WordleStateService,
    private readonly wordle: WordleService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    merge(
      this.wordle.initSubscriptions(),
      this.wordleState.inputWord$.pipe(tap(() => this.cdr.markForCheck())),
    )
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public handleKey(key: string): void {
    this.wordle.handleKey(key);
  }

  public selectWordLength(length: number): void {
    this.wordle.selectWordLength(length);
  }

  public ngOnDestroy(): void {
    this.wordleState.destroy();
  }
}
