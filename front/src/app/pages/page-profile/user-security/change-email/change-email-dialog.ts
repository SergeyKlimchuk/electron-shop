import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email-dialog.html',
  styleUrls: ['./change-email-dialog.styl']
})
export class ChangeEmailDialog {

  oldEmail: string;
  newEmail = '';
  password = '';

  constructor(public dialogRef: MatDialogRef<ChangeEmailDialog>,
              private userService: UserService,
              private snack: MatSnackBar) {
    userService.getCurrentUser().subscribe(
      user => {
        console.log(user.email);
        if (user) {
          this.oldEmail = user.email;
        }
      }
    );
  }

  applyChanges() {
    this.userService.updateEmail(this.newEmail, this.password).subscribe(
      () => this.dialogRef.close(this.newEmail),
      error => {
        console.error(error);
        this.snack.open('Произошла ошибка при обновлении почты!');
      }
    );
  }

  exit() {
    this.dialogRef.close();
  }
}
