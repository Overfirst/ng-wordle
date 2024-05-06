import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordleKeyIsWide',
  pure: false,
})
export class WordleKeyIsWidePipe implements PipeTransform {
  public transform(key: string): boolean {
    return key === 'Backspace' || key === 'Enter';
  }
}
