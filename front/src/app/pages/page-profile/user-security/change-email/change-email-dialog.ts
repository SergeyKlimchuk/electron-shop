import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
      () => this.dialogRef.close(0),
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
