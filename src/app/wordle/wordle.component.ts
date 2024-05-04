import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordleComponent {}
