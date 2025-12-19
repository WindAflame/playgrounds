import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CsvDisplayModeType, CsvDisplayModeOptionsInterface } from 'src/app/_models/csv-display';
import { CsvRawDisplayComponent } from './csv-raw-display/csv-raw-display.component';
import { CsvParsedDisplayComponent } from './csv-parsed-display/csv-parsed-display.component';
import { CsvSpreadsheetDisplayComponent } from './csv-spreadsheet-display/csv-spreadsheet-display.component';
import { CsvAgGridDisplayComponent } from './csv-aggrid-display/csv-aggrid-display.component';
import { CsvData } from 'src/app/_models/csv-reader';

@Component({
  selector: 'app-csv-display',
  templateUrl: './csv-display.component.html',
  styleUrls: ['./csv-display.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    CsvRawDisplayComponent,
    CsvParsedDisplayComponent,
    CsvSpreadsheetDisplayComponent,
    CsvAgGridDisplayComponent
  ]
})
export class CsvDisplayComponent {
  @Input() csvData: CsvData | null = null;

  displayMode: CsvDisplayModeType = 'raw';
  displayModeOptions: CsvDisplayModeOptionsInterface[] = [{
    value: "parsed",
    label: "Parsed Table"
  }, {
    value: "raw",
    label: "Raw Content"
  }, {
    value: "spreadsheet",
    label: "Spreadsheet (jspreadsheet-ce)"
  }, {
    value: "ag-grid-ce",
    label: "AG Grid (ag-grid-ce)"
  }]
}
