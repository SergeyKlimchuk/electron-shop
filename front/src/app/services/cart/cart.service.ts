import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/models/products/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
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

  private updateValues() {
    this.http.get<Product[]>('/api/cart').subscribe(
      products => this.valeus$.next(products),
      error => console.error('Произошла ошибка при получении списка продуктов в корзине!', error)
    );
  }
}
