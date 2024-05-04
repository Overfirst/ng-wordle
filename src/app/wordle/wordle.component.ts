import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { WordleKeyboard, WordleWord } from './model/wordle.model';
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

  /* Введённые слова */
  public readonly inputWord$: Observable<WordleWord> =
    this.wordleState.inputWord$;

  /* Вводимое слово */
  public readonly wordRows$: Observable<WordleWord[]> =
    this.wordleState.wordRows$;

  /* Количество попыток */
  public readonly attemptsCount: number = this.wordleState.attemptsCount;

  /* Клавиатура */
  public readonly WORDLE_KEYBOARD: WordleKeyboard = WORDLE_KEYBOARD;

  constructor(
    private readonly wordleState: WordleStateService,
    private readonly wordle: WordleService,
  ) {}

  public ngOnInit(): void {
    this.wordle.initSubscriptions().pipe(untilDestroyed(this)).subscribe();
  }

  public ngOnDestroy(): void {
    this.wordleState.destroy();
  }
}
