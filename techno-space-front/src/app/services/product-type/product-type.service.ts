import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from 'src/models/products/product-type';

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

  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('/api/product-types');
  }

  updateProductType(productType: ProductType) {
    return this.http.put<ProductType>('/api/product-types', productType);
  }
}
