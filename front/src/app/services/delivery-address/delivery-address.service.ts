import { HttpClient } from '@angular/common/http';
import { DeliveryAddress } from './../../../models/users/address';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService {

  constructor(private http: HttpClient) { }

  saveAddress(address: DeliveryAddress) {
    return this.http.post('/api/user/current/address', address);
  }
}
