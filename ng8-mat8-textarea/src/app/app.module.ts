import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


import { AppComponent } from './app.component';
import { DisableControlDirective } from './disable-control.directive';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatInputModule],
  declarations: [AppComponent, DisableControlDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
