import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/models/users/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.styl']
})
export class UserInfoComponent implements OnInit {

  user: User;
  newUser: User;
  editMode = false;

  constructor(private userService: UserService,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.user = user;
        this.newUser = Object.assign({}, user);
      },
      error => {
        const message = 'При запросе пользователя произошла ошибка!';
        console.error(message, error);
        this.snack.open(message);
      }
    );
  }

  revert() {
    this.newUser = Object.assign({}, this.user);
    this.editMode = false;
  }

  save() {
    this.userService.updateUser(this.newUser.name,
      this.newUser.lastName,
      this.newUser.secondName,
      this.newUser.phoneNumber).subscribe(
        () => {
          this.snack.open('Информация успешно обновлена!');
          this.editMode = false;
        },
        error => {
          const message = 'При обновлении информации произошла ошибка!';
          console.error(message, error);
          this.snack.open(message);
        }
    );
  }

}
