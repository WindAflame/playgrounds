import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { RoutingsContracts } from '../app.routing.contracts';

@Injectable()
export class AuthentificationGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (res,rej) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) { res(true); } 
            else { this.router.navigate([RoutingsContracts.SignUp]); res(false); }
          }
        )
      }
    )
  }

}
