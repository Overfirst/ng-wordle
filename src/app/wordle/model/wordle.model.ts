/* Интерфейс буквы */
export interface WordleLetter {
  /* Сама буква */
  letter: string;
  /* Индекс буквы в слове */
  index: number;
  /*
    Тип буквы:
      - valid: есть в слове и стоит на своём месте,
      - invalid: есть в слове, но не на своём месте,
      - error: нет в слове,
      - unknown: неизвестно (по умолчанию при вводе)
   */
  type: WordleLetterType;
}

/* Тип буквы */
export type WordleLetterType = 'valid' | 'invalid' | 'error' | 'unknown';

/* Тип для слова - массив букв */
export type WordleWord = WordleLetter[];

/* Интерфейс для словаря */
export interface WordleWordCollection {
  [key: number]: string[];
}

/* Тип для клавиатуры (массив из массивов строк клавиатуры) */
export type WordleKeyboard = string[][];

/*
  Состояние игры:
    - waiting: ожидание (по умолчанию),
    - playing: играем,
    - win: победа,
    - lose: поражение
*/
export type WordleGameState = 'waiting' | 'playing' | 'win' | 'lose';
