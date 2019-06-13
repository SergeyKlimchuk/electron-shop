import { User } from './../../../models/users/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { controlIsInvalid } from 'src/utils/form-validator-msg';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-page-registration',
  templateUrl: './page-registration.component.html',
  styleUrls: ['./page-registration.component.styl']
})
export class PageRegistrationComponent implements OnInit {
  model = new User();
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {}

  // TODO: Сделать нормальные валидаторы

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const minPasswordLength = this.userService.getRequiredPasswordLength();
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(minPasswordLength)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ctrlIsInvalid(controlName: string): boolean {
    return controlIsInvalid(this.registerForm, controlName);
  }

  submit() {
    const form = this.registerForm;
    this.userService.registration(form.value)
      .subscribe(
        (newAccount) => {
          this.userService.signIn(newAccount.email, newAccount.password);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
