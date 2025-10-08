import { Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    // title: "Welcome",
  },
  {
    path: 'home',
    component: HomeComponent,
    title: "Home",
  }
];

// Advanced Title Strategy
@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = `${title} - TitleStrategy`;
    } else {
      document.title = `Welcome`;
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: TitleStrategy,  useClass: TemplatePageTitleStrategy}]
})
export class AppRoutingModule { }
