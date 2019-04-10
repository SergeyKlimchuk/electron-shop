import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap, tap, throttleTime } from 'rxjs/operators';
import { BillService } from 'src/app/services/bill/bill.service';
import { Bill } from 'src/models/bills/bill';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.styl']
})
export class HistoryListComponent implements OnInit {

  @Input()
  isPageable = false;

  bills$ = new BehaviorSubject<Bill[]>([]);
  batchSize = 10;
  page = 0;
  finished = false;
  load = false;

  constructor(private billService: BillService,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.getBills();
  }

  scroll() {
    console.log('SCROLL');

    this.getBills();
  }

  getBills() {
    if (this.finished) {
      return;
    }
    this.load = true;
    this.billService.getMyBills(this.page, this.batchSize).subscribe(
      response => {
        this.load = false;
        const currentValues = this.bills$.getValue();
        const elements = currentValues.concat(response.content);
        this.bills$.next(elements);
        this.finished = response.totalPages - 1 === this.page++;
      }
    );
  }

}
