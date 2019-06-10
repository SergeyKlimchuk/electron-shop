import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from 'src/models/bills/bill';
import { PageableResponse } from 'src/models/system/pageable-response';

import { BillStatus } from './../../../models/bills/BillStatus';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getMyBills(page: number = null, size: number = null) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    return this.http.get<PageableResponse<Bill>>('/api/user/current/bills', {params});
  }

  getMyBill(billId: number) {
    return this.http.get<Bill>(`/api/user/current/bills/${billId}`);
  }

  getAllBillsByStatus(page: number = null, size: number = null, statuses: BillStatus[]) {
    const params: any = {};
    if (page) {
      params.page = page.toString();
    }
    if (size) {
      params.size = size.toString();
    }
    if (statuses) {
      params.billStatus = statuses.join(',');
    }
    return this.http.get<PageableResponse<Bill>>(`/api/bills/status-filter`, {params});
  }

  updateBillStatus(billId: number, status: BillStatus) {
    return this.http.post<void>(`/api/bills/${billId}/status`, status);
  }

  getTextForBillStatus(status: BillStatus) {
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
      case BillStatus.REMOVED:
        return 'Удален';
      default:
        return;
    }
  }
}
