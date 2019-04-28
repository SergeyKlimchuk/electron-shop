import { Product } from './../../../models/products/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.styl']
})
export class ProductSliderComponent {

  @Input()
  values: Product[] = [];

  @Input()
  label = '';

  @Input()
  showItemsCount = 4;

  index = 0;

  constructor() { }


  next() {
    if (this.values.length - this.showItemsCount !== this.index) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  prior() {
    if (this.index !== 0) {
      this.index--;
    } else {
      this.index = this.values.length - this.showItemsCount;
    }
  }
}
