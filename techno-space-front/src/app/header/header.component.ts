import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/users/user';

import { UserService } from './../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      user => {
        console.log('user', user);
        this.user = user;
      }
    );
  }

}
