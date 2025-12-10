import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { LayoutComponent } from './layout/layout.component';

const homeRoutes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', component: HomeComponent }
  ] }
];

@NgModule({
  imports: [ RouterModule.forChild(homeRoutes) ],
  exports: [ RouterModule ],
  declarations: [ HomeComponent, LayoutComponent ],
})
export class HomeModule { }