import { Product } from './../../../../../../models/products/product';
import { BillService } from 'src/app/services/bill/bill.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Bill } from 'src/models/bills/bill';
import { BillStatus } from 'src/models/bills/BillStatus';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.styl']
})
export class BillEditDialogComponent {

  bill: Bill;
  newStatus: BillStatus = null;

  allowedStatuses = [
    BillStatus.PAYED,
    BillStatus.PENDING_PROCESSING,
    BillStatus.REMOVED,
  ];

  constructor(public dialogRef: MatDialogRef<BillEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Bill,
              private billService: BillService) {
    this.bill = data;
  }

  save() {
    this.dialogRef.close(this.newStatus);
  }

}
