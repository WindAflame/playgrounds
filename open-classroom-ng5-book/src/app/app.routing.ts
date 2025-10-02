import { Routes } from '@angular/router';
import { SignupComponent } from './authentification/signup/signup.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { BookListComponent } from './book/list/list.component';
import { BookNewComponent } from './book/new/new.component';
import { BookDetailComponent } from './book/detail/detail.component';
import { RoutingsContracts as Path } from './app.routing.contracts';
import { AuthentificationGuardService } from './services/authentification-guard.service';

export const routing: Routes = [
    { path: Path.SignUp, component: SignupComponent },
    { path: Path.SignIn, component: SigninComponent },
    { path: Path.BookList, canActivate: [AuthentificationGuardService], component: BookListComponent },
    { path: Path.BookNew, canActivate: [AuthentificationGuardService], component: BookNewComponent },
    { path: Path.BookDetail, canActivate: [AuthentificationGuardService], component: BookDetailComponent },
    { path: '', redirectTo: Path.BookList, pathMatch: 'full' },
    { path: '**', redirectTo: Path.BookList }
]