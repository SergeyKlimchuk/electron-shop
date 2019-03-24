import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/models/products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>('/api/cart');
  }

  addProduct(productId: number) {
    return this.http.post<void>(`/api/cart/${productId}`, {});
  }

  removeProduct(productId: number) {
    return this.http.delete<void>(`/api/cart/${productId}`);
  }
}
