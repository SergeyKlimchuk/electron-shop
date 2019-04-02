import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  successPayLink: string;

  constructor(private http: HttpClient) {
    this.successPayLink = `${environment.domain}/profile`;
  }

  generatePayLink(productIds: number[]) {
    return this.http.post<string>('/api/generate-pay-link', { productIds, successUrl: this.successPayLink});
  }
}
