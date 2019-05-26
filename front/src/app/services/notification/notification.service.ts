import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snack: MatSnackBar) { }

  notify(message: string) {
    this.snack.open(message);
  }

  notifyAboutError(message: string, error: Error) {
    this.snack.open(message);
    console.error(error);
  }
}
