import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/products/product';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.styl']
})
export class SearchDropdownComponent implements OnInit {

  @Input()
  products: Array<Product>;

  constructor() { }

  ngOnInit() {
  }

}
