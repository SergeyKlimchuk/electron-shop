import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from 'src/models/products/product-type';
import { PageableResponse } from 'src/models/system/pageable-response';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private http: HttpClient) {}

  saveProductType(productType: ProductType) {
    return this.http.post<ProductType>('/api/product-types', productType);
  }

  getProductType(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`/api/product-types/${id}`);
  }

  getProductTypes(page: number = null, size: number = null): Observable<PageableResponse<ProductType>> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    return this.http.get<PageableResponse<ProductType>>('/api/product-types', { params });
  }

  updateProductType(productType: ProductType) {
    return this.http.put<ProductType>('/api/product-types', productType);
  }
}
