import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule, RouterModule.forChild(loginRoutes) ],
  exports: [ RouterModule ],
  declarations: [ LoginComponent ],
})
export class LoginModule { }