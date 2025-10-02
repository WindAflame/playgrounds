import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';
import { UserConstracts } from '../../contracts/user.conctracts';
import { RoutingsContracts as Path } from '../../app.routing.contracts';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  private passwordPattern = /[0-9a-zA-Z]{6,}/;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthentificationService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    });

  }

  onSubmit(){
    const email = this.signInForm.value[UserConstracts.Email];
    const password = this.signInForm.value[UserConstracts.Password];
    this.authService.signInUser(email, password).then(
      () => { this.router.navigate([Path.BookList]); },
      (err) => { this.errorMessage = err; }
    );
  }

}
