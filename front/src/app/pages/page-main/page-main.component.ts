import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

import { SliderPage } from '../../core/slider/slider-page';
import { Product } from './../../../models/products/product';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.styl']
})
export class PageMainComponent {
  pages = new Array<SliderPage>();
  bestProducts: Product[] = [];
  newestProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.pages.push(
      {
        url: '/actions/1',
        imgUrl: 'assets/resources/1_1920x360.jpg'
      },
      {
        url: '/actions/2',
        imgUrl: 'assets/resources/2_1920x360.jpg'
      },
      {
        url: '/actions/3',
        imgUrl: 'assets/resources/3_1920x360.jpg'
      },
      {
        url: '/actions/4',
        imgUrl: 'assets/resources/4_1920x360.jpg'
      }
    );
    this.loadBestProducts();
    this.loadNewestProducts();
  }

  loadBestProducts() {
    this.productService.getProducts(null, 0, 12, 'views,desc').subscribe(
      products => this.bestProducts = products.content
    );
  }

  loadNewestProducts() {
    this.productService.getProducts(null, 0, 12, 'createdDate,desc').subscribe(
      products => this.newestProducts = products.content
    );
  }
}
