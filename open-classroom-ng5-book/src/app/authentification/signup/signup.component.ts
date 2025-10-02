import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';
import { UserConstracts } from '../../contracts/user.conctracts';
import { RoutingsContracts as Path } from '../../app.routing.contracts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
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
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    });

  }

  onSubmit(){
    const email = this.signUpForm.value[UserConstracts.Email];
    const password = this.signUpForm.value[UserConstracts.Password];
    this.authService.createNewUser(email, password).then(
      () => { this.router.navigate([Path.BookList]); },
      (err) => { this.errorMessage = err; }
    );
  }

}
