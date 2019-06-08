import { NotificationService } from './../../../../services/notification/notification.service';
import { Bill } from 'src/models/bills/bill';
import { MatPaginator, MatCheckbox, MatDialog } from '@angular/material';
import { BillService } from './../../../../services/bill/bill.service';
import { Component, OnInit, ViewChildren, ViewChild, QueryList, AfterViewInit } from '@angular/core';
import { BillStatus } from 'src/models/bills/BillStatus';
import { BillEditDialogComponent } from 'src/app/bills-list/bill-edit/bill-edit.component';

@Component({
  selector: 'app-bills-subpage',
  templateUrl: './bills-subpage.component.html',
  styleUrls: ['./bills-subpage.component.styl']
})
export class BillsSubpageComponent implements AfterViewInit {

  filterChanged = false;

  allowedStatuses = [
    BillStatus.PAYED,
    BillStatus.PENDING_PROCESSING,
    BillStatus.REMOVED,
  ];

  selectedStatuses: BillStatus[] = [];

  bills: Bill[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChildren(MatCheckbox)
  checkboxes: QueryList<MatCheckbox>;

  constructor(private billService: BillService,
              private matDialog: MatDialog,
              private notificationService: NotificationService) { }

  ngAfterViewInit() {
    this.loadBills();
  }

  loadBills() {
    const statuses = this.allowedStatuses.length === 0 ? this.allowedStatuses : this.allowedStatuses;
    this.billService.getAllBillsByStatus(this.paginator.pageIndex, this.paginator.pageSize, statuses).subscribe(
      bills => {
        this.bills = bills.content;
        this.paginator.length = bills.totalElements;
      }
    );
  }

  updateSelected(status: BillStatus) {
    const alreadyContains = this.allowedStatuses.some(x => x === status);
    if (alreadyContains) {
      this.allowedStatuses = this.allowedStatuses.filter(x => x !== status);
    } else {
      this.allowedStatuses.push(status);
    }
    this.filterChanged = true;
  }

  clickElement(bill: Bill) {
    console.log('BILL', bill);

    this.matDialog.open(BillEditDialogComponent, {data: bill}).afterClosed().subscribe(
      (newStatus: BillStatus) => {
        console.log('NEW STATUS', newStatus);

        if (newStatus) {
          this.billService.updateBillStatus(bill.id, newStatus).subscribe(
            () => {
              this.notificationService.notify('Статус заказа успешно обновлен!');
              this.loadBills();
            },
            error => {
              this.notificationService.notifyAboutError('Не удалось обновить статус заказа!', error);
            }
          )
        }
      }
    );
  }

}
