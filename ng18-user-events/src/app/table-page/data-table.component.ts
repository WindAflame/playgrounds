// data-table.component.ts
import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { UserPreferencesService } from '../_services/user-preferences.service';
import { SearchMode, TableColumn } from '../_models/user-preferences.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPseudoCheckboxModule } from '@angular/material/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'app-data-table',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit, OnDestroy {
  // Inject dependencies using the modern inject() function
  private readonly preferencesService = inject(UserPreferencesService);

  @ViewChild(MatTable) table!: MatTable<any>;

  // Définition de toutes les colonnes disponibles
  allColumns: TableColumn[] = [
    { id: 'name', visible: true, width: 200, order: 0 },
    { id: 'email', visible: true, width: 250, order: 1 },
    { id: 'phone', visible: false, width: 150, order: 2 },
    { id: 'company', visible: true, width: 200, order: 3 },
    { id: 'date', visible: true, width: 150, order: 4 }
  ];

  displayedColumns: string[] = [];
  searchMode: SearchMode = SearchMode.FILTER;
  dataSource: any[] = [];
  filteredDataSource: any[] = [];
  searchText: string = '';

  private destroy$ = new Subject<void>();

  // Données mockées
  private mockData = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '+1-555-0123', company: 'Acme Corp', date: '2024-01-15' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1-555-0124', company: 'Tech Solutions', date: '2024-01-16' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1-555-0125', company: 'Global Inc', date: '2024-01-17' },
    { name: 'Alice Williams', email: 'alice.w@example.com', phone: '+1-555-0126', company: 'StartUp LLC', date: '2024-01-18' },
    { name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '+1-555-0127', company: 'Innovation Hub', date: '2024-01-19' },
    { name: 'Diana Prince', email: 'diana.prince@example.com', phone: '+1-555-0128', company: 'Justice League', date: '2024-01-20' },
    { name: 'Eve Anderson', email: 'eve.anderson@example.com', phone: '+1-555-0129', company: 'Data Systems', date: '2024-01-21' },
    { name: 'Frank Miller', email: 'frank.m@example.com', phone: '+1-555-0130', company: 'Web Services', date: '2024-01-22' },
    { name: 'Grace Hopper', email: 'grace.h@example.com', phone: '+1-555-0131', company: 'Computing Co', date: '2024-01-23' },
    { name: 'Henry Ford', email: 'henry.ford@example.com', phone: '+1-555-0132', company: 'Auto Industries', date: '2024-01-24' },
    { name: 'Iris Chen', email: 'iris.chen@example.com', phone: '+1-555-0133', company: 'Design Studio', date: '2024-01-25' },
    { name: 'Jack Thompson', email: 'jack.t@example.com', phone: '+1-555-0134', company: 'Media Group', date: '2024-01-26' },
    { name: 'Kelly Martin', email: 'kelly.martin@example.com', phone: '+1-555-0135', company: 'Finance Corp', date: '2024-01-27' },
    { name: 'Leo Garcia', email: 'leo.garcia@example.com', phone: '+1-555-0136', company: 'Marketing Plus', date: '2024-01-28' },
    { name: 'Mia Rodriguez', email: 'mia.r@example.com', phone: '+1-555-0137', company: 'Health Services', date: '2024-01-29' }
  ];

  ngOnInit(): void {
    // Charger les données mockées
    this.dataSource = this.mockData;
    this.filteredDataSource = [...this.mockData];

    // Charger les préférences au démarrage
    const userId = this.getCurrentUserId();

    this.preferencesService.initialize(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(preferences => {
        if (preferences?.tablePreferences) {
          const savedColumns = preferences.tablePreferences.columns;

          // Merge saved preferences with component's column definitions
          this.mergeColumnPreferences(savedColumns);
          this.searchMode = preferences.tablePreferences.searchMode;
          this.updateDisplayedColumns();

          // If preferences were empty (first load), save the merged columns
          if (!savedColumns || savedColumns.length === 0) {
            this.preferencesService.updateColumns(this.allColumns);
          }
        }
      });

    // Écouter les changements de préférences
    this.preferencesService.preferences$
      .pipe(takeUntil(this.destroy$))
      .subscribe(preferences => {
        if (preferences?.tablePreferences) {
          // Merge saved preferences with component's column definitions
          this.mergeColumnPreferences(preferences.tablePreferences.columns);
          this.searchMode = preferences.tablePreferences.searchMode;
          this.updateDisplayedColumns();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Sauvegarde finale lors de la destruction du composant
    this.preferencesService.saveImmediately().subscribe();
  }

  /**
   * Merge saved preferences with component's column definitions
   * Component columns are the source of truth, preferences only update properties
   */
  private mergeColumnPreferences(savedColumns: TableColumn[]): void {
    // Create a map of saved preferences by column id
    const savedPrefsMap = new Map(savedColumns.map(col => [col.id, col]));

    // Update component columns with saved preferences if they exist
    this.allColumns = this.allColumns.map(col => {
      const savedCol = savedPrefsMap.get(col.id);
      if (savedCol) {
        // Merge: keep component column but update user preferences
        return {
          ...col,
          visible: savedCol.visible,
          width: savedCol.width,
          order: savedCol.order
        };
      }
      // No saved preference for this column, keep component default
      return col;
    });
  }

  /**
   * Met à jour la liste des colonnes affichées
   */
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.allColumns
      .filter(col => col.visible)
      .sort((a, b) => a.order - b.order)
      .map(col => col.id);
  }

  /**
   * Gère le changement de visibilité d'une colonne
   */
  onColumnVisibilityChange(columnId: string, visible: boolean): void {
    this.preferencesService.updateColumnVisibility(columnId, visible);
  }

  /**
   * Toggle column visibility (used by menu click)
   */
  toggleColumnVisibility(columnId: string): void {
    const column = this.allColumns.find(col => col.id === columnId);
    if (column) {
      this.preferencesService.updateColumnVisibility(columnId, !column.visible);
    }
  }

  /**
   * Change le mode de recherche
   */
  toggleSearchMode(): void {
    const newMode = this.searchMode === SearchMode.FILTER 
      ? SearchMode.LUCENE 
      : SearchMode.FILTER;
    
    this.searchMode = newMode;
    this.preferencesService.updateSearchMode(newMode);
  }

  /**
   * Réinitialise les préférences aux valeurs par défaut
   */
  resetPreferences(): void {
    this.allColumns = [
      { id: 'name', visible: true, width: 200, order: 0 },
      { id: 'email', visible: true, width: 250, order: 1 },
      { id: 'phone', visible: false, width: 150, order: 2 },
      { id: 'company', visible: true, width: 200, order: 3 },
      { id: 'date', visible: true, width: 150, order: 4 }
    ];
    this.searchMode = SearchMode.FILTER;
    
    this.preferencesService.updateColumns(this.allColumns);
    this.preferencesService.updateSearchMode(this.searchMode);
    this.updateDisplayedColumns();
  }

  /**
   * Obtient la largeur d'une colonne
   */
  getColumnWidth(columnId: string): number {
    const column = this.allColumns.find(col => col.id === columnId);
    return column?.width || 150;
  }

  /**
   * Récupère l'ID de l'utilisateur connecté
   */
  private getCurrentUserId(): string {
    // Implémentez votre logique pour obtenir l'ID utilisateur
    // Par exemple depuis un service d'authentification
    return 'user-123'; // Exemple
  }

  /**
   * Apply filter to the data
   */
  applyFilter(): void {
    if (!this.searchText || this.searchText.trim() === '') {
      // No search text, show all data
      this.filteredDataSource = [...this.dataSource];
      return;
    }

    const searchLower = this.searchText.toLowerCase().trim();

    if (this.searchMode === SearchMode.FILTER) {
      // Simple filter: search across all visible columns
      this.filteredDataSource = this.dataSource.filter(item => {
        // Search in all columns
        return Object.keys(item).some(key => {
          const value = item[key];
          if (value) {
            return value.toString().toLowerCase().includes(searchLower);
          }
          return false;
        });
      });
    } else {
      // Lucene mode - for now, just use the same simple filter
      // In production, you would parse the Lucene query and apply it
      this.filteredDataSource = this.dataSource.filter(item => {
        return Object.keys(item).some(key => {
          const value = item[key];
          if (value) {
            return value.toString().toLowerCase().includes(searchLower);
          }
          return false;
        });
      });
    }
  }
}