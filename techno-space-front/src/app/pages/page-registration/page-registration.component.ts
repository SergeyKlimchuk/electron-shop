import { User } from './../../../models/users/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-registration',
  templateUrl: './page-registration.component.html',
  styleUrls: ['./page-registration.component.styl']
})
export class PageRegistrationComponent implements OnInit {

  model = new User();

  constructor() {
  }

  ngOnInit() {
  }

}
