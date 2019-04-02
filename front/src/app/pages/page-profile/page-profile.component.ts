import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.styl']
})
export class PageProfileComponent implements OnInit {

  constructor(private snack: MatSnackBar) { }

  ngOnInit() {
  }

}
