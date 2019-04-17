import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/models/products/product';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.updateValues();
  }

  valeus$ = new BehaviorSubject<Product[]>([]);

  getProducts(): Observable<Product[]> {
    return this.valeus$;
  }

  addProduct(productId: number) {
    return this.http.post<void>(`/api/favorites/${productId}`, {}).pipe(
      tap(() => this.updateValues())
    );
  }

  removeProduct(productId: number) {
    return this.http.delete<void>(`/api/favorites/${productId}`).pipe(
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
    this.http.get<Product[]>('/api/favorites').subscribe(
      products => this.valeus$.next(products),
      error => console.error('Произошла ошибка при получении списка продуктов в избранном!', error)
    );
  }
}
