import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-default-strategy',
  standalone: true,
  template: `
    <h2 style="color: blue;">Stratégie de détection par défaut</h2>
    <p>Compteur : {{ counter }}</p>
    <button (click)="increment()">Incrémenter</button>
  `
})
export class DefaultStrategyComponent {
  counter = 0;

  increment() {
    this.counter++;
  }
}

@Component({
  selector: 'app-on-push-strategy',
  standalone: true,
  template: `
    <h2 style="color: green;">Stratégie de détection OnPush</h2>
    <p>Compteur : {{ counter }}</p>
    <button (click)="increment()">Incrémenter</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushStrategyComponent {
  counter = 0;

  increment() {
    this.counter++;
  }
}