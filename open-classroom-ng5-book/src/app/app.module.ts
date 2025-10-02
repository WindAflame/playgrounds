import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { BookListComponent } from './book/list/list.component';
import { BookDetailComponent } from './book/detail/detail.component';
import { BookNewComponent } from './book/new/new.component';
import { HeaderComponent } from './header/header.component';
import { AuthentificationService } from './services/authentification.service';
import { AuthentificationGuardService } from './services/authentification-guard.service';
import { BookService } from './services/book.service';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    BookDetailComponent,
    BookNewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routing)
  ],
  providers: [
    AuthentificationService,
    AuthentificationGuardService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
