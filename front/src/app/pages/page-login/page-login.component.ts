import { UserService } from './../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { controlIsInvalid } from 'src/utils/form-validator-msg';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.styl']
})
export class PageLoginComponent implements OnInit {

  authForm: FormGroup;
  failAuth = false;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    userService.userIsAuthenticated().subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.redirectToMainPage();
        }
      }
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const minPasswordLength = this.userService.getRequiredPasswordLength();
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(minPasswordLength)]]
    });
  }

  ctrlIsInvalid(controlName: string): boolean {
    return controlIsInvalid(this.authForm, controlName);
  }

  signIn() {
    this.userService.signIn(this.authForm.value.email, this.authForm.value.password)
      .subscribe(
        () => {
          this.redirectToMainPage();
        },
        (error) => {
          console.log('error', error);
          this.failAuth = true;
          setTimeout( () => {
            this.failAuth = false;
          }, 5000);
        }
      );
  }

  redirectToMainPage() {
    this.router.navigate(['/main']);
  }
}
