import { Injectable } from '@angular/core';
import { Product } from 'src/models/products/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  public searchProductsByPartialName(produtName: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>('/api/search', {
      params: {q: produtName}
    });
  }
}
