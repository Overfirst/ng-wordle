import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordleExtractKey',
  pure: false,
})
export class WordleExtractKeyPipe implements PipeTransform {
  public transform(key: string): string {
    return key === 'Backspace' ? '⌫' : key;
  }
}
