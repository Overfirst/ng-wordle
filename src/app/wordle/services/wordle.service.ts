import { Inject, Injectable } from '@angular/core';
import { filter, fromEvent, map, merge, Observable, of, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { WordleStateService } from './wordle-state.service';
import { WordleLetter } from '../model/wordle.model';

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
    return of(null);
  }

  private handleKey(key: string): void {
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
      this.wordleState.wordRows.length < this.wordleState.attemptsCount - 1;

    if (inputEqualSecretLength && rowsLengthAllowed) {
      this.wordleState.wordRows = [
        ...this.wordleState.wordRows,
        this.wordleState.inputWord,
      ];

      this.wordleState.inputWord = [];
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
}
