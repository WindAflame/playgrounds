export interface CsvData {
  headers: string[];
  rows: any[];
  rawContent: string;
}

export interface CsvError {
  message: string;
  type: 'validation' | 'parsing' | 'reading';
}