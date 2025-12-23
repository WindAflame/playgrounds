# CSV Editor - Angular 16

Angular 16 standalone application to upload, validate and display CSV files.

## Features

- **CSV Upload**: File validation and upload
- **Multiple Display Modes**:
  - Raw content view
  - Parsed table view (HTML native)
  - Spreadsheet view (jspreadsheet-ce)
- **CSV Parsing Libraries**:
  - **csv-parse** (current, active)
  - **PapaParse** (legacy, kept for reference)

## Architecture

This project uses **standalone components** (no NgModule required).

### CSV Reader Classes

The project includes two CSV reader implementations in `src/app/_classes/csv-reader.class.ts`:

1. **CsvReader** (current):
   - Uses `csv-parse` library
   - Synchronous parsing
   - Active implementation used throughout the app

2. **CsvReaderPapa** (legacy):
   - Uses `PapaParse` library
   - Asynchronous parsing with callbacks
   - Kept for reference, marked as `@deprecated`

Both classes implement the same interface:
```typescript
interface CsvData {
  headers: string[];
  rows: any[];
  rawContent: string;
}

interface CsvError {
  message: string;
  type: 'validation' | 'parsing' | 'reading';
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Technologies

- Angular 16 (Standalone Components)
- csv-parse (CSV parsing - active)
- PapaParse (CSV parsing - legacy)
- jspreadsheet-ce (Spreadsheet display)
- TypeScript
- HTML5 native controls

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.
