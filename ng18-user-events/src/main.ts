import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { UserPreferencesService } from './app/_services/user-preferences.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    UserPreferencesService
  ]
}).catch(err => console.error(err));
