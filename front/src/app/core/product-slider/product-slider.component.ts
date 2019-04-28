import { Product } from './../../../models/products/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.styl']
})
export class ProductSliderComponent implements OnInit {

  @Input()
  values: Product[] = [];

  @Input()
  label = '';

  index = 0;

  transform = '-50';

  constructor() { }

  ngOnInit() {
  }

}
