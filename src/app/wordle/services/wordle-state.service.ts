import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  WordleGameState,
  WordleKeyboardKeyType,
  WordleWord,
  WordleWordLetterRepeats,
} from '../model/wordle.model';

@Injectable()
export class WordleStateService {
  /* Количество попыток */
  public readonly attemptsCount: number = 6;

  /* Длина слова по умолчанию */
  public readonly defaultWordLength: number = 5;

  /* Минимальная длина слова */
  public readonly minWordLength: number = 4;

  /* Максимальная длина слова */
  public readonly maxWordLength: number = 11;

  /* Задержка при развороте букв */
  public readonly letterFlipDelay: number = 200;

  /* Задержка после разворота всех букв */
  public readonly afterWordOpenDelay: number = 500;

  /* Задержка перед раскрытием букв на клавиатуре */
  public get updateGameStateDelay(): number {
    return this.letterFlipDelay * this.wordLength + this.afterWordOpenDelay;
  }

  /* Состояние игры */
  private readonly gameState$$: BehaviorSubject<WordleGameState> =
    new BehaviorSubject<WordleGameState>('waiting');

  public readonly gameState$: Observable<WordleGameState> =
    this.gameState$$.asObservable();

  public get gameState(): WordleGameState {
    return this.gameState$$.getValue();
  }

  public set gameState(state: WordleGameState) {
    this.gameState$$.next(state);
  }

  /* Длина загаданного слова */
  private readonly wordLength$$: BehaviorSubject<number> =
    new BehaviorSubject<number>(this.defaultWordLength);

  public readonly wordLength$: Observable<number> =
    this.wordLength$$.asObservable();

  public get wordLength(): number {
    return this.wordLength$$.getValue();
  }

  public set wordLength(length: number) {
    this.wordLength$$.next(length);
  }

  /* Загаданное слово */
  private readonly secretWord$$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public readonly secretWord$: Observable<string> =
    this.secretWord$$.asObservable();

  public get secretWord(): string {
    return this.secretWord$$.getValue();
  }

  public set secretWord(word: string) {
    this.secretWord$$.next(word);
  }

  /* Вводимое слово */
  private readonly inputWord$$: BehaviorSubject<WordleWord> =
    new BehaviorSubject<WordleWord>([]);

  public readonly inputWord$: Observable<WordleWord> =
    this.inputWord$$.asObservable();

  public get inputWord(): WordleWord {
    return this.inputWord$$.getValue();
  }

  public set inputWord(word: WordleWord) {
    this.inputWord$$.next(word);
  }

  /* Введённые слова */
  private readonly wordRows$$: BehaviorSubject<WordleWord[]> =
    new BehaviorSubject<WordleWord[]>([]);

  public readonly wordRows$: Observable<WordleWord[]> =
    this.wordRows$$.asObservable();

  public get wordRows(): WordleWord[] {
    return this.wordRows$$.getValue();
  }

  public set wordRows(rows: WordleWord[]) {
    this.wordRows$$.next(rows);
  }

  private wordleKeyboardKeyTypes$$ = new BehaviorSubject<WordleKeyboardKeyType>(
    {},
  );

  public wordleKeyboardKeyTypes$ = this.wordleKeyboardKeyTypes$$.asObservable();

  public get wordleKeyboardKeyTypes(): WordleKeyboardKeyType {
    return this.wordleKeyboardKeyTypes$$.getValue();
  }

  public set wordleKeyboardKeyTypes(types: WordleKeyboardKeyType) {
    this.wordleKeyboardKeyTypes$$.next(types);
  }

  public wordleWordLetterRepeats: WordleWordLetterRepeats = {};

  public destroy(): void {
    this.gameState$$.complete();
    this.wordLength$$.complete();
    this.secretWord$$.complete();
    this.inputWord$$.complete();
    this.wordRows$$.complete();
  }
}
