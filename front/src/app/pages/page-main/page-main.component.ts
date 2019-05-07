import { ActionService } from './../../services/action/action.service';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

import { SliderPage } from '../../core/slider/slider-page';
import { Product } from './../../../models/products/product';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.styl']
})
export class PageMainComponent {
  actions$ = new BehaviorSubject<SliderPage[]>([]);
  bestProducts: Product[] = [];
  newestProducts: Product[] = [];

  constructor(private productService: ProductService,
              private actionService: ActionService) {
    this.actionService.getActions(0, 10).subscribe(
      actions => this.actions$.next(actions.content.map( x => {
        return {
          url: `/actions/${x.id}`, imgUrl: x.imageUrl
        };
       }))
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
