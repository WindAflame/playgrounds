import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchMode, TableColumn, UserPreferences } from '../_models/user-preferences.model';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private readonly STORAGE_KEY = 'user-table-preferences';
  private preferencesSubject = new BehaviorSubject<UserPreferences | null>(null);
  public preferences$ = this.preferencesSubject.asObservable();

  private updateQueue = new BehaviorSubject<Partial<UserPreferences> | null>(null);

  constructor() {
    // Mise à jour automatique avec debounce pour éviter trop d'écritures en localStorage
    this.updateQueue.pipe(
      debounceTime(500), // Attendre 500ms après la dernière modification
      distinctUntilChanged()
    ).subscribe(updates => {
      if (updates) {
        this.saveToLocalStorage();
      }
    });
  }

  /**
   * Initialise les préférences pour un utilisateur
   */
  initialize(userId: string): Observable<UserPreferences> {
    // Charger depuis localStorage
    let prefs = this.loadFromLocalStorage(userId);

    if (!prefs) {
      // Retourner des préférences par défaut si aucune n'existe
      prefs = this.getDefaultPreferences(userId);
      this.saveToLocalStorage(prefs);
    }
    
      this.preferencesSubject.next(prefs);
      return of(prefs);
  }

  /**
   * Met à jour les colonnes visibles
   */
  updateColumns(columns: TableColumn[]): void {
    const currentPrefs = this.preferencesSubject.value;
    if (!currentPrefs) return;

    const updatedPrefs: UserPreferences = {
      ...currentPrefs,
      tablePreferences: {
        ...currentPrefs.tablePreferences,
        columns
      }
    };

    this.preferencesSubject.next(updatedPrefs);
    this.queueUpdate({ tablePreferences: updatedPrefs.tablePreferences });
  }

  /**
   * Met à jour la largeur d'une colonne spécifique
   */
  updateColumnWidth(columnId: string, width: number): void {
    const currentPrefs = this.preferencesSubject.value;
    if (!currentPrefs) return;

    const updatedColumns = currentPrefs.tablePreferences.columns.map(col =>
      col.id === columnId ? { ...col, width } : col
    );

    this.updateColumns(updatedColumns);
  }

  /**
   * Met à jour la visibilité d'une colonne
   */
  updateColumnVisibility(columnId: string, visible: boolean): void {
    const currentPrefs = this.preferencesSubject.value;
    if (!currentPrefs) return;

    const updatedColumns = currentPrefs.tablePreferences.columns.map(col =>
      col.id === columnId ? { ...col, visible } : col
    );

    this.updateColumns(updatedColumns);
  }

  /**
   * Met à jour le mode de recherche
   */
  updateSearchMode(mode: SearchMode): void {
    const currentPrefs = this.preferencesSubject.value;
    if (!currentPrefs) return;

    const updatedPrefs: UserPreferences = {
      ...currentPrefs,
      tablePreferences: {
        ...currentPrefs.tablePreferences,
        searchMode: mode
      }
    };

    this.preferencesSubject.next(updatedPrefs);
    this.queueUpdate({ 
      tablePreferences: { 
        searchMode: mode 
      } 
    } as Partial<UserPreferences>);
  }

  /**
   * Ajoute une mise à jour dans la file d'attente
   */
  private queueUpdate(updates: Partial<UserPreferences>): void {
    this.updateQueue.next(updates);
  }

  /**
   * Sauvegarde les modifications dans localStorage
   */
  private saveToLocalStorage(prefs?: UserPreferences | null): void {
    const currentPrefs = prefs ?? this.preferencesSubject.value;
    if (!currentPrefs) return;

    try {
      const prefsToSave = {
        ...currentPrefs,
        lastUpdated: new Date()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefsToSave));
      console.log('Préférences sauvegardées dans localStorage');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  }

  /**
   * Charge les préférences depuis localStorage
   */
  private loadFromLocalStorage(userId: string): UserPreferences | null {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (savedData) {
        const prefs = JSON.parse(savedData) as UserPreferences;
        // Vérifier que c'est bien pour le bon utilisateur
        if (prefs.userId === userId) {
          return prefs;
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement depuis localStorage:', error);
    }
    return null;
  }

  /**
   * Sauvegarde immédiate (sans debounce) - utile lors de la déconnexion
   */
  saveImmediately(): Observable<any> {
    this.saveToLocalStorage();
    return of(true);
  }

  /**
   * Retourne les préférences par défaut
   * Note: Component columns are the source of truth, these are just initial user preferences
   */
  private getDefaultPreferences(userId: string): UserPreferences {
    return {
      userId,
      tablePreferences: {
        columns: [],  // Empty array: component will use its own defaults via merge
        searchMode: SearchMode.FILTER
      }
    };
  }

  /**
   * Récupère les préférences actuelles de manière synchrone
   */
  getCurrentPreferences(): UserPreferences | null {
    return this.preferencesSubject.value;
  }
}