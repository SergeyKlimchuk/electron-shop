import { User } from './../../../models/users/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  controlIsInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control.invalid && control.touched;
  }

  submit() {
    const form = this.registerForm;
    this.userService.registration(form.value)
      .subscribe(
        (response) => {
          console.info(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
