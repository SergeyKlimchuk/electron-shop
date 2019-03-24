import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInfoValue } from 'src/models/products/product-info-text';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoValueService {

  constructor(private http: HttpClient) { }

  saveProductInfoValue(productInfoValue: ProductInfoValue) {
    return this.http.post<ProductInfoValue>('/api/product-info-values', productInfoValue);
  }

  getProductInfoValue(id: number) {
    return this.http.get<ProductInfoValue>(`/api/product-info-values/${id}`);
  }

  getProductInfoValues(productId: number) {
    let params = new HttpParams();
    if (productId) {
      params = params.set('productId', productId.toString());
    }
    return this.http.get< ProductInfoValue[] >('/api/product-info-values', { params });
  }

  updateProductInfoValue(productInfoValue: ProductInfoValue) {
    return this.http.put<ProductInfoValue>('/api/product-info-values', productInfoValue);
  }
}
