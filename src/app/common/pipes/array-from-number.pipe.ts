import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayFromNumber' })
export class ArrayFromNumberPipe implements PipeTransform {
  public transform(value: number): number[] {
    return [...new Array(value)].map((_, i) => i);
  }
}
