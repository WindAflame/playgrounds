import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username: string;

  constructor(
    private authService: AuthenticationService
  ) {
    this.username = this.authService.username;
  }

  logout() {
    this.authService.logout();
  }
}