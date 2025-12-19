
import { CsvData, CsvError } from '../_models/csv-reader';
import { csvParse } from 'd3-dsv';

/**
 * CSV Reader using csv-parse library
 */
export class CsvReader {

  readCsvFile(file: File): Promise<CsvData> {
    return new Promise((resolve, reject) => {
      if (!this.isValidCsvFile(file)) {
        const error: CsvError = {
          message: 'File must be in .csv format',
          type: 'validation'
        };
        reject(error);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const csvContent = e.target?.result as string;

        if (!csvContent) {
          const error: CsvError = {
            message: 'File content is empty',
            type: 'reading'
          };
          reject(error);
          return;
        }

        this.parseCsv(csvContent)
          .then(csvData => resolve(csvData))
          .catch(error => reject(error));
      };

      reader.onerror = () => {
        const error: CsvError = {
          message: 'Error reading file',
          type: 'reading'
        };
        reject(error);
      };

      reader.readAsText(file);
    });
  }

  private isValidCsvFile(file: File): boolean {
    return file.name.toLowerCase().endsWith('.csv');
  }

  private parseCsv(csvContent: string): Promise<CsvData> {
    return new Promise((resolve, reject) => {
      try {
        // Parse CSV with csv-parse
        const records = csvParse(csvContent);

        if (!records || records.length === 0) {
          const error: CsvError = {
            message: 'CSV file is empty or has no valid data',
            type: 'parsing'
          };
          reject(error);
          return;
        }

        const csvData: CsvData = {
          headers: records.columns,
          rows: records,
          rawContent: csvContent
        };

        resolve(csvData);
      } catch (error: any) {
        const csvError: CsvError = {
          message: 'CSV parsing error: ' + (error.message || 'Unknown error'),
          type: 'parsing'
        };
        reject(csvError);
      }
    });
  }
}
