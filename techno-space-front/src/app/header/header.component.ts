import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/models/users/user';

import { UserService } from './../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
})
export class HeaderComponent implements OnInit, OnDestroy {

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

  signOut() {
    this.userService.signOut().subscribe(
      () => {
        window.location.reload();
      },
      error => {
        console.error('Произошла ошибка при выходе из профиля!', error);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('Destroy!');
  }

}
