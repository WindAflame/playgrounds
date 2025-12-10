import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  username = undefined;

  constructor(
    private router: Router
  ) {}

  isLogged() {
    return this.username != undefined;
  }
  
  /**
   * @param creditentials is username.
   */
  login(creditentials: string) {
    this.username = creditentials;
    this.router.navigate(['/home']);
  }

  logout() {
    this.username = undefined;
    this.router.navigate(['/login']);
  }
}