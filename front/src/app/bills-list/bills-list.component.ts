import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Bill } from 'src/models/bills/bill';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.styl']
})
export class BillsListComponent implements OnInit {

  @Input()
  dataSource: Bill[] = [];

  @Output()
  rowClick = new EventEmitter<Bill>();

  showCollumns = ['id', 'status', 'createdDate'];

  constructor() { }

  ngOnInit() {
  }
}
