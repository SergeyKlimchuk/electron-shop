import { Product } from './../../../models/products/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list-min',
  templateUrl: './product-list-min.component.html',
  styleUrls: ['./product-list-min.component.styl']
})
export class ProductListMinComponent implements OnInit {

  @Input()
  products: Product[];

  constructor() { }

  ngOnInit() {
  }

}
