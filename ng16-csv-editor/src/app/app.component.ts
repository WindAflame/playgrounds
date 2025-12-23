import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FileUploadFormComponent } from './components/file-upload-form/file-upload-form.component';
import { CsvDisplayComponent } from './components/csv-display/csv-display.component';
import { CsvData, CsvError } from './_models/csv-reader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    NgIf,
    FileUploadFormComponent,
    CsvDisplayComponent
  ]
})
export class AppComponent {
  title = 'CSV Editor - Angular 16';
  csvData: CsvData | null = null;
  errorMessage: string = '';

  onCsvLoaded(csvData: CsvData): void {
    this.csvData = csvData;
    this.errorMessage = '';
  }

  onError(error: CsvError): void {
    this.errorMessage = error.message;
    this.csvData = null;
  }
}
