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

  updateAddress(address: DeliveryAddress) {
    return this.http.put('/api/user/current/address', address);
  }

  deleteAddress(addressId: number) {
    return this.http.delete(`/api/user/current/address/${addressId}`);
  }

  setFavoriteAddress(addressId: number) {
    return this.http.post(`/api/user/current/address/favorite/${addressId}`, undefined);
  }
}
