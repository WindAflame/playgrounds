import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { CsvReader } from 'src/app/_classes/csv-reader.d3-dsv.class';
import { CsvData, CsvError } from 'src/app/_models/csv-reader';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class FileUploadFormComponent {
  private csvReader = new CsvReader();

  @Output() csvLoaded = new EventEmitter<CsvData>();
  @Output() errorOccurred = new EventEmitter<CsvError>();

  selectedFile: File | null = null;
  isLoading: boolean = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;
      this.isLoading = true;

      this.csvReader.readCsvFile(file)
        .then((csvData: CsvData) => {
          console.log(csvData);
          this.csvLoaded.emit(csvData);
          this.isLoading = false;
        })
        .catch((error: CsvError) => {
          this.errorOccurred.emit(error);
          this.isLoading = false;
        });
    }
  }

  resetForm(): void {
    this.selectedFile = null;
  }
}
