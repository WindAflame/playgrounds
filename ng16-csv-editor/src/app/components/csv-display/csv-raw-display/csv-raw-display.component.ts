import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-csv-raw-display',
  templateUrl: './csv-raw-display.component.html',
  styleUrls: ['./csv-raw-display.component.css'],
  standalone: true
})
export class CsvRawDisplayComponent {
  @Input() rawContent: string = '';
}
