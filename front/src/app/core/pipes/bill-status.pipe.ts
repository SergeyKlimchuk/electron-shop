import { Pipe, PipeTransform } from '@angular/core';
import { BillStatus } from 'src/models/bills/BillStatus';

@Pipe({
  name: 'billStatus'
})
export class BillStatusPipe implements PipeTransform {

  transform(status: BillStatus, args?: any): string {
    switch (status) {
      case BillStatus.AWAIT_DELIVERY:
        return 'Ожидает доставки';
      case BillStatus.DELIVERED:
        return 'Доставлено';
      case BillStatus.EXPIRED:
        return 'Оплата просрочена';
      case BillStatus.PAYED:
        return 'Оплачено';
      case BillStatus.PENDING_PAY:
        return 'Ожидает оплаты';
      case BillStatus.PENDING_PROCESSING:
        return 'Ожидает обработки';
      case BillStatus.PROCESSING:
        return 'Обрабатывается';
      case BillStatus.REJECTED:
        return 'Оплата откланена';
      case BillStatus.SENT:
        return 'Отправлен';
      default:
        return;
    }
  }

}
