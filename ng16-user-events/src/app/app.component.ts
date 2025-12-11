import { Component } from '@angular/core';
import { DataTableComponent } from './table-page/data-table.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [DataTableComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ng18-user-events';
}
