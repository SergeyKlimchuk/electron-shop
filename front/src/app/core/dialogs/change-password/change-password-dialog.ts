import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password-dialog.html',
  styleUrls: ['./change-password-dialog.styl']
})
export class ChangePasswordDialog implements OnInit {

  oldPassword: string;
  newPassword = '';
  newPasswordConfirm = '';

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialog>,
              private snack: MatSnackBar,
              private userService: UserService) { }

  ngOnInit() {
  }

  applyChanges() {
    this.userService.updatePassword(this.newPassword, this.oldPassword).subscribe(
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
