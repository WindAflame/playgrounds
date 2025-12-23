import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-csv-parsed-display',
  templateUrl: './csv-parsed-display.component.html',
  styleUrls: ['./csv-parsed-display.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class CsvParsedDisplayComponent {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];
}
