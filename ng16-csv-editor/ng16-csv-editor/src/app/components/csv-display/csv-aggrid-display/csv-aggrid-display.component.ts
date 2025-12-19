import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-csv-aggrid-display',
  templateUrl: './csv-aggrid-display.component.html',
  styleUrls: ['./csv-aggrid-display.component.css'],
  imports: [AgGridAngular],
  standalone: true
})
export class CsvAgGridDisplayComponent implements OnChanges {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];

  columns: ColDef[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headers'] && this.headers.length > 0) {
      this.initSpreadsheet();
    }
  }

  private initSpreadsheet(): void {
    // Create columns configuration
    this.columns = this.headers.map(header => ({
      field: header,
      editable: true, 
    }));
  }
}
