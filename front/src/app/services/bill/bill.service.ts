import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Bill } from 'src/models/bills/bill';
import { PageableResponse } from 'src/models/system/pageable-response';
import { Product } from 'src/models/products/product';

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
}
