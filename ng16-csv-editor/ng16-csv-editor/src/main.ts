import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ModuleRegistry } from 'ag-grid-community';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));