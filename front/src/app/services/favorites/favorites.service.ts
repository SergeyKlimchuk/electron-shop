import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/models/products/product';

import { UserService } from './../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  valeus$ = new BehaviorSubject<Product[]>([]);

  addProduct(productId: number) {
    return this.http.post<void>(`/api/favorites/${productId}`, {});
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/favorites');
  }

  checkInFavorites(productId: number) {
    return this.http.get<boolean>(`/api/favorites/check/${productId}`);
  }

  removeProduct(productId: number) {
    return this.http.delete<void>(`/api/favorites/${productId}`);
  }
}
