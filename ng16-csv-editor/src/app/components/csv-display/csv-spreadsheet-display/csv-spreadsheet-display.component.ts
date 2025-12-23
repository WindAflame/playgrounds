import { Component, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as jspreadsheet from 'jspreadsheet-ce';

@Component({
  selector: 'app-csv-spreadsheet-display',
  templateUrl: './csv-spreadsheet-display.component.html',
  styleUrls: ['./csv-spreadsheet-display.component.css'],
  standalone: true
})
export class CsvSpreadsheetDisplayComponent implements AfterViewInit, OnDestroy {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];

  @ViewChild('spreadsheet', { static: false }) spreadsheetDiv!: ElementRef;

  private spreadsheetInstance: any;

  ngAfterViewInit(): void {
    if (this.headers.length > 0 && this.rows.length > 0) {
      this.initSpreadsheet();
    }
  }

  ngOnDestroy(): void {
    if (this.spreadsheetInstance) {
      jspreadsheet.destroy(this.spreadsheetDiv.nativeElement);
    }
  }

  private initSpreadsheet(): void {
    // Convert object array to array of arrays
    const data = this.rows.map(row =>
      this.headers.map(header => row[header] || '')
    );

    // Create columns configuration
    const columns = this.headers.map(header => ({
      title: header,
      width: 120
    }));

    // Initialize jspreadsheet
    this.spreadsheetInstance = jspreadsheet(this.spreadsheetDiv.nativeElement, {
      worksheets: [{
        data: data,
        columns: columns,
        tableOverflow: true,
        tableWidth: '100%',
        tableHeight: '500px',
        search: true,
        pagination: 10,
        paginationOptions: [10, 25, 50, 100]
      }]
    });
  }
}
