import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { User } from 'src/models/users/user';
import { tap } from 'rxjs/operators';
import { ChangeEmailDialog } from 'src/app/core/dialogs/change-email/change-email-dialog';
import { ChangeSecondaryEmailDialog } from 'src/app/core/dialogs/change-secondary-email/change-secondary-email-dialog';
import { ChangePasswordDialog } from 'src/app/core/dialogs/change-password/change-password-dialog';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.styl']
})
export class UserSecurityComponent {

  user: User;
  haveSecondaryEmail = false;

  constructor(private userService: UserService,
              private snack: MatSnackBar,
              private matDialog: MatDialog) {
    userService.getCurrentUser().pipe(
      tap(user => this.haveSecondaryEmail = user && !!user.secondaryEmail)
    ).subscribe(
      user => this.user = user,
      error => {
        console.error(error);
        this.snack.open('Произошла ошибка при получени пользователя!');
      }
    );
  }

  updateEmail() {
    this.matDialog.open(ChangeEmailDialog).afterClosed().subscribe(
      newEmail => {
        if (newEmail) {
          this.snack.open('Почта успешно обновлена!');
        }
      }
    );
  }

  updateSecondaryEmail() {
    this.matDialog.open(ChangeSecondaryEmailDialog).afterClosed().subscribe(
      newEmail => {
        if (newEmail) {
          this.snack.open('Запасная почта успешно обновлена!');
        }
      }
    );
  }

  updatePassword() {
    this.matDialog.open(ChangePasswordDialog).afterClosed().subscribe(
      newEmail => {
        if (newEmail) {
          this.snack.open('Пароль успешно обновлен!');
        }
      }
    );
  }

}
