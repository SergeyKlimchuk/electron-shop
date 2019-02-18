import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  public async searchProductsByName(text: string) {
    console.log('start');
    const response = await this.httpClient.get(`http://localhost:8080/products/search?q=${text}`).toPromise();
    console.log(response);
  }
}
