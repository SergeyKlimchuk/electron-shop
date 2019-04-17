import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/models/products/product';

import { UserService } from './../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.updateValues();
  }

  valeus$ = new BehaviorSubject<Product[]>([]);

  getProducts(): Observable<Product[]> {
    return this.valeus$;
  }

  addProduct(productId: number) {
    return this.http.post<void>(`/api/cart/${productId}`, {}).pipe(
      tap(() => this.updateValues())
    );
  }

  removeProduct(productId: number) {
    return this.http.delete<void>(`/api/cart/${productId}`).pipe(
      tap(() => this.updateValues())
    );
  }

  clearCart() {
    return this.http.delete<void>('/api/cart').pipe(
      tap(() => this.updateValues())
    );
  }

  private updateValues() {
    const userIsAuthenticated = this.userService.userIsAuthenticated();
    console.log('User is authenticated:', userIsAuthenticated);
    if (!userIsAuthenticated) {
      this.valeus$.next(null);
      return;
    }

    this.http.get<Product[]>('/api/cart').subscribe(
      products => this.valeus$.next(products),
      error => console.error('Произошла ошибка при получении списка продуктов в корзине!', error)
    );
  }

}
