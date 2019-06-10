import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-secondary-email',
  templateUrl: './change-secondary-email-dialog.html',
  styleUrls: ['./change-secondary-email-dialog.styl']
})
export class ChangeSecondaryEmailDialog {

  newEmail: string;
  oldEmail: string;
  password: string;

  constructor(public dialogRef: MatDialogRef<ChangeSecondaryEmailDialog>,
              private userService: UserService,
              private snack: MatSnackBar) {
    userService.getCurrentUser().subscribe(
      user => {
        if (user) {
          console.log(user.secondaryEmail);
          this.newEmail = user.secondaryEmail;
          this.oldEmail = user.secondaryEmail;
        }
      }
    );
  }

  applyChanges() {
    this.userService.updateSecondaryEmail(this.newEmail, this.password).subscribe(
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
