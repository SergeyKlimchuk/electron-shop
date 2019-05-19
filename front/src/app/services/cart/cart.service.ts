import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/models/products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  valeus$ = new BehaviorSubject<Product[]>([]);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/cart');
  }

  checkInCart(productId: number) {
    return this.http.get<boolean>(`/api/cart/check/${productId}`);
  }

  addProduct(productId: number) {
    return this.http.post<void>(`/api/cart/${productId}`, {});
  }

  removeProduct(productId: number) {
    return this.http.delete<void>(`/api/cart/${productId}`);
  }

  clearCart() {
    return this.http.delete<void>('/api/cart');
  }
}
