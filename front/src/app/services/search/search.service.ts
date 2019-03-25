import { Injectable } from '@angular/core';
import { Product } from 'src/models/products/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchRequestSegment } from './search-request-segment';
import { PageableResponse } from 'src/models/system/pageable-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  public searchProductsByProperties(properties: SearchRequestSegment[], page: number, size: number): Observable<PageableResponse<Product>> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    return this.httpClient.post<PageableResponse<Product>>('/api/search', properties, { params });
  }
}
