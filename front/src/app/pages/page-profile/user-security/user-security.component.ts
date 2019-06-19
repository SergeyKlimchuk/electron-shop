import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';
import { ChangeEmailDialog } from 'src/app/pages/page-profile/user-security/change-email/change-email-dialog';
import { ChangePasswordDialog } from 'src/app/pages/page-profile/user-security/change-password/change-password-dialog';
import {
  ChangeSecondaryEmailDialog,
} from 'src/app/pages/page-profile/user-security/change-secondary-email/change-secondary-email-dialog';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/models/users/user';

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
          this.userService.signIn(newEmail, this.user.password);
          this.snack.open('Почта успешно обновлена!');
        }
      }
    );
  }

  updateSecondaryEmail() {
    this.matDialog.open(ChangeSecondaryEmailDialog).afterClosed().subscribe(
      newEmail => {
        if (newEmail) {
          this.user.secondaryEmail = newEmail;
          this.snack.open('Запасная почта успешно обновлена!');
        }
      }
    );
  }

  updatePassword() {
    this.matDialog.open(ChangePasswordDialog).afterClosed().subscribe(
      newPassword => {
        if (newPassword) {
          this.userService.signIn(this.user.email, newPassword);
          this.snack.open('Пароль успешно обновлен!');
        }
      }
    );
  }

}
