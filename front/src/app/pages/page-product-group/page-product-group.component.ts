import { Subject, Observable } from 'rxjs';
import { Action } from './../../../models/actions/actions';
import { ActionService } from './../../services/action/action.service';
import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/models/products/product-type';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { SliderPage } from 'src/app/core/slider/slider-page';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-page-product-group',
  templateUrl: './page-product-group.component.html',
  styleUrls: ['./page-product-group.component.styl']
})
export class PageProductGroupComponent implements OnInit {

  productsTypes$ = new Observable<ProductType[]>();
  productsNotFound = false;

  constructor(private productService: ProductTypeService) {
    this.loadProductTypes();
  }

  loadProductTypes() {
    this.productsTypes$ = this.productService.getProductTypes().pipe(
      map(x => x.content),
      tap(x => this.productsNotFound = x.length === 0)
    );
  }

  ngOnInit() {
  }

}
