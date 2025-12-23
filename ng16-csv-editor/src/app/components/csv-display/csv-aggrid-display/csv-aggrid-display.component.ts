import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-csv-aggrid-display',
  templateUrl: './csv-aggrid-display.component.html',
  styleUrls: ['./csv-aggrid-display.component.css'],
  imports: [AgGridAngular, CommonModule, FormsModule],
  standalone: true
})
export class CsvAgGridDisplayComponent implements OnChanges {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  columns: ColDef[] = [];
  gridApi!: GridApi;

  // Configuration par défaut pour toutes les colonnes
  defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true, // Affiche les filtres sous les en-têtes
  };

  newColumnName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headers'] && this.headers.length > 0) {
      this.initSpreadsheet();
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  private initSpreadsheet(): void {
    // Create columns configuration
    this.columns = this.headers.map(header => ({
      field: header,
      headerName: header,
    }));
  }

  // Ajouter une nouvelle ligne vide
  addRow(): void {
    const newRow: any = {};
    this.headers.forEach(header => {
      newRow[header] = '';
    });
    this.rows = [...this.rows, newRow];
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rows);
    }
  }

  // Supprimer les lignes sélectionnées
  deleteSelectedRows(): void {
    const selectedRows = this.agGrid.api.getSelectedRows();
    if (selectedRows.length === 0) {
      alert('Veuillez sélectionner au moins une ligne');
      return;
    }

    this.rows = this.rows.filter(row => !selectedRows.includes(row));
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.rows);
    }
  }

  // Ajouter une nouvelle colonne
  addColumn(): void {
    if (!this.newColumnName || this.newColumnName.trim() === '') {
      alert('Veuillez entrer un nom de colonne');
      return;
    }

    const columnName = this.newColumnName.trim();

    // Vérifier si la colonne existe déjà
    if (this.headers.includes(columnName)) {
      alert('Cette colonne existe déjà');
      return;
    }

    // Ajouter la colonne aux headers
    this.headers.push(columnName);

    // Ajouter la colonne à chaque ligne
    this.rows.forEach(row => {
      row[columnName] = '';
    });

    // Recréer les colonnes
    this.initSpreadsheet();

    if (this.gridApi) {
      this.gridApi.setGridOption('columnDefs', this.columns);
      this.gridApi.setGridOption('rowData', this.rows);
    }

    this.newColumnName = '';
  }

  // Supprimer une colonne
  deleteColumn(columnName: string): void {
    if (!confirm(`Voulez-vous vraiment supprimer la colonne "${columnName}" ?`)) {
      return;
    }

    // Retirer des headers
    this.headers = this.headers.filter(h => h !== columnName);

    // Retirer de chaque ligne
    this.rows.forEach(row => {
      delete row[columnName];
    });

    // Recréer les colonnes
    this.initSpreadsheet();

    if (this.gridApi) {
      this.gridApi.setGridOption('columnDefs', this.columns);
      this.gridApi.setGridOption('rowData', this.rows);
    }
  }
}
