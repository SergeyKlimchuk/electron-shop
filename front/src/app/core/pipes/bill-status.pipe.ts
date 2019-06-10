import { BillService } from 'src/app/services/bill/bill.service';
import { Pipe, PipeTransform } from '@angular/core';
import { BillStatus } from 'src/models/bills/BillStatus';

@Pipe({
  name: 'billStatus'
})
export class BillStatusPipe implements PipeTransform {

  constructor(private billService: BillService) {
  }

  transform(status: BillStatus, args?: any): string {
    return this.billService.getTextForBillStatus(status);
  }

}
