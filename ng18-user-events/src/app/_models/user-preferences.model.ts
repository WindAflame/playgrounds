export interface TableColumn {
  id: string;
  visible: boolean;
  width?: number;
  order: number;
}

export enum SearchMode {
  FILTER = 'filter',
  LUCENE = 'lucene'
}

export interface UserPreferences {
  userId: string;
  tablePreferences: {
    columns: TableColumn[];
    searchMode: SearchMode;
  };
  lastUpdated?: Date;
}