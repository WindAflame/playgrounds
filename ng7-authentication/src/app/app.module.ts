import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './_guards/authentication.guard';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [ AuthenticationGuard ] },  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes) ],
  exports:      [ RouterModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
