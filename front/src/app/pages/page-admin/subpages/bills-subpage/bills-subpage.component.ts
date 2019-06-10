import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox, MatDialog, MatPaginator } from '@angular/material';
import { BillEditDialogComponent } from 'src/app/pages/page-admin/subpages/bills-subpage/bill-edit/bill-edit.component';
import { Bill } from 'src/models/bills/bill';
import { BillStatus } from 'src/models/bills/BillStatus';

import { BillService } from './../../../../services/bill/bill.service';
import { NotificationService } from './../../../../services/notification/notification.service';

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
    const statuses = this.selectedStatuses.length === 0 ? this.allowedStatuses : this.selectedStatuses;
    this.billService.getAllBillsByStatus(this.paginator.pageIndex, this.paginator.pageSize, statuses).subscribe(
      bills => {
        this.bills = bills.content;
        this.paginator.length = bills.totalElements;
      }
    );
  }

  updateSelected(status: BillStatus) {
    const alreadyContains = this.selectedStatuses.some(x => x === status);
    if (alreadyContains) {
      this.selectedStatuses = this.selectedStatuses.filter(x => x !== status);
    } else {
      this.selectedStatuses.push(status);
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
