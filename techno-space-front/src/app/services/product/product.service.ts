import { ProductProperty } from './../../../models/products/product-property';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableResponse } from 'src/models/system/pageable-response';
import { Product } from 'src/models/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  saveProduct(product: Product) {
    return this.http.post<Product>('/api/products', product);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  getProducts(productTypeId: number = null, page: number = null, size: number = null) {
    let params = new HttpParams();
    if (productTypeId) {
      params = params.set('productTypeId', productTypeId.toString());
    }
    if (page) {
      params = params.set('page', page.toString());
    }
    if (size) {
      params = params.set('size', size.toString());
    }
    return this.http.get< PageableResponse<Product> >('/api/products', { params });
  }

  updateProduct(product: Product) {
    return this.http.put<Product>('/api/products', product);
  }

  getProductProperties(productId: number) {
    return this.http.get<ProductProperty[]>(`api/products/${productId}/properties`);
  }

  // TODO: Разобраться с этим несуразным без-пагинационным методом
  getProductsCountByProductType(productTypeId: number) {
    return this.http.get<number>(`/api/products/${productTypeId}/count`);
  }
}
