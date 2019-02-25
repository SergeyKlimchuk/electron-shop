import { Component, OnInit, Input } from '@angular/core';
import { ProductType } from 'src/models/products/product-type';

@Component({
  selector: 'app-best-categories',
  templateUrl: './best-categories.component.html',
  styleUrls: ['./best-categories.component.styl']
})
export class BestCategoriesComponent implements OnInit {


  @Input()
  productTypes: Array<ProductType>;

  constructor() { }

  ngOnInit() {
  }

}
