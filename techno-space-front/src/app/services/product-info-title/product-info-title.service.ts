import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInfoTitle } from 'src/models/products/product-info-title';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoTitleService {

  constructor(private http: HttpClient) { }

  saveProductInfoTitle(productInfoTitle: ProductInfoTitle) {
    return this.http.post<ProductInfoTitle>('/api/product-info-titles', ProductInfoTitle);
  }

  getProductInfoTitle(id: number) {
    return this.http.get<ProductInfoTitle>(`/api/product-info-titles/${id}`);
  }

  getProductInfoTitles(productTypeId: number) {
    let params = new HttpParams();
    if (productTypeId) {
      params = params.set('productTypeId', productTypeId.toString());
    }
    return this.http.get<ProductInfoTitle[]>('/api/product-info-titles', { params });
  }

  updateProductInfoTitle(productInfoTitle: ProductInfoTitle) {
    return this.http.put<ProductInfoTitle>('/api/product-info-titles', ProductInfoTitle);
  }
}
