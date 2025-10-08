import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-default-strategy></app-default-strategy>
    <app-on-push-strategy></app-on-push-strategy>
  `
})
export class AppComponent {
  title = 'MyApp';
}
