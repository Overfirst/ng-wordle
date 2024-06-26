import { Inject, Injectable } from '@angular/core';
import { filter, fromEvent, map, merge, Observable, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import random from 'random';
import { WordleStateService } from './wordle-state.service';
import { WordleLetter, WordleWordLetterRepeats } from '../model/wordle.model';
import { WORDLE_WORD_COLLECTION } from '../const/wordle-collection.const';

@Injectable()
export class WordleService {
  constructor(
    @Inject(DOCUMENT)
    private readonly document: Document,
    private readonly wordleState: WordleStateService,
  ) {}

  public initSubscriptions(): Observable<unknown> {
    return merge(this.listenKeyboard(), this.listenWordLengthChanges());
  }

  public handleKey(key: string): void {
    switch (key) {
      case 'Backspace':
        this.handleBackspace();
        break;

      case 'Enter':
        this.handleEnter();
        break;

      default:
        this.handleLetterKey(key);
    }
  }

  public selectWordLength(length: number): void {
    if (this.wordleState.wordLength !== length) {
      this.wordleState.wordLength = length;
    }
  }

  private reset(): void {
    this.wordleState.gameState = 'waiting';
    this.wordleState.wordRows = [];
    this.wordleState.inputWord = [];
    this.wordleState.wordleKeyboardKeyTypes = {};
    this.selectSecretWord();
  }

  private selectSecretWord(): void {
    const words: string[] = WORDLE_WORD_COLLECTION[this.wordleState.wordLength];
    const randomWordIndex: number = random.int(0, words.length - 1);

    this.wordleState.secretWord = words[randomWordIndex];

    this.wordleState.wordleWordLetterRepeats = this.wordleState.secretWord
      .split('')
      .reduce((acc: WordleWordLetterRepeats, letter: string) => {
        if (!acc[letter]) {
          acc[letter] = 0;
        }

        acc[letter]++;
        return acc;
      }, {});

    console.log({ secretWord: this.wordleState.secretWord });
  }

  private listenKeyboard(): Observable<unknown> {
    return fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
      map((event: KeyboardEvent) => event.key),

      filter((key: string) => {
        const isActionKey: boolean = ['Backspace', 'Enter'].includes(key);
        const isLetterKey: boolean = /^[а-яА-Я]+$/.test(key);

        return isActionKey || isLetterKey;
      }),

      tap((key: string) => this.handleKey(key)),
    );
  }

  private listenWordLengthChanges(): Observable<unknown> {
    return this.wordleState.wordLength$.pipe(tap(() => this.reset()));
  }

  private handleBackspace(): void {
    /* Удаляем последнюю букву */
    if (this.wordleState.inputWord.length > 0) {
      this.wordleState.inputWord = this.wordleState.inputWord.slice(0, -1);
    }
  }

  private handleEnter(): void {
    const inputEqualSecretLength: boolean =
      this.wordleState.inputWord.length === this.wordleState.secretWord.length;

    const rowsLengthAllowed: boolean =
      this.wordleState.wordRows.length < this.wordleState.attemptsCount;

    if (inputEqualSecretLength) {
      this.calculateLetterTypeForInputWord();
      this.calculateKeyboardKeyTypes();

      if (rowsLengthAllowed) {
        this.wordleState.wordRows = [
          ...this.wordleState.wordRows,
          this.wordleState.inputWord,
        ];

        this.wordleState.inputWord = [];
      }
    }
  }

  private handleLetterKey(key: string): void {
    /* Добавляем новую букву */
    if (
      this.wordleState.inputWord.length < this.wordleState.secretWord.length
    ) {
      const newLetter: WordleLetter = {
        letter: key,
        index: this.wordleState.inputWord.length,
        type: 'unknown',
      };

      this.wordleState.inputWord = [...this.wordleState.inputWord, newLetter];
    }
  }

  private calculateLetterTypeForInputWord(): void {
    const letterCountByValid: { [key: string]: number } = {};
    const letterCountByInvalid: { [key: string]: number } = {};

    const { inputWord, secretWord, wordleWordLetterRepeats } = this.wordleState;

    inputWord.forEach((letter: WordleLetter) => {
      if (secretWord[letter.index] === letter.letter) {
        if (!letterCountByValid[letter.letter]) {
          letterCountByValid[letter.letter] = 0;
        }

        letter.type = 'valid';
        letterCountByValid[letter.letter]++;
      }

      if (secretWord.indexOf(letter.letter) === -1) {
        letter.type = 'error';
      }
    });

    inputWord.forEach((letter: WordleLetter) => {
      if (letter.type === 'unknown') {
        if (!letterCountByInvalid[letter.letter]) {
          letterCountByInvalid[letter.letter] = 0;
        }

        const maxHasbutCount =
          wordleWordLetterRepeats[letter.letter] -
          (letterCountByValid[letter.letter] ?? 0);

        if (letterCountByInvalid[letter.letter] < maxHasbutCount) {
          letter.type = 'invalid';
          letterCountByInvalid[letter.letter]++;
        } else {
          letter.type = 'error';
        }
      }
    });
  }

  private calculateKeyboardKeyTypes(): void {
    this.wordleState.inputWord.forEach((letter: WordleLetter) => {
      if (this.wordleState.wordleKeyboardKeyTypes[letter.letter] !== 'valid') {
        this.wordleState.wordleKeyboardKeyTypes[letter.letter] = letter.type;
      }
    });

    this.wordleState.wordleKeyboardKeyTypes = {
      ...this.wordleState.wordleKeyboardKeyTypes,
    };
  }
}
