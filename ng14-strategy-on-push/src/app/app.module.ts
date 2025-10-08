import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DefaultStrategyComponent, OnPushStrategyComponent } from './counter.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DefaultStrategyComponent, OnPushStrategyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
