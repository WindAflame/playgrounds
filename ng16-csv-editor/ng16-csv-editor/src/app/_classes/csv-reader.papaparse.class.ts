import * as Papa from 'papaparse';
import { CsvData, CsvError } from '../_models/csv-reader';

/**
 * CSV Reader using PapaParse library (legacy)
 * @deprecated Use CsvReader (CSV Parse) instead
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
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.errors.length > 0) {
            const error: CsvError = {
              message: 'CSV parsing error: ' + result.errors[0].message,
              type: 'parsing'
            };
            reject(error);
          } else {
            const csvData: CsvData = {
              headers: result.meta.fields || [],
              rows: result.data,
              rawContent: csvContent
            };
            resolve(csvData);
          }
        },
        error: (error: any) => {
          const csvError: CsvError = {
            message: 'Parsing error: ' + error.message,
            type: 'parsing'
          };
          reject(csvError);
        }
      });
    });
  }
}
