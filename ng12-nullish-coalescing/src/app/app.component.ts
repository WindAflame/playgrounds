import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultValue = 'World';
  aName = null;
  // Before - Angular 12
  title = this.aName !== null && this.aName !== undefined ? this.aName : 'World';
  // Now in Angular 12
  title2 = this.aName ?? 'World';
}
