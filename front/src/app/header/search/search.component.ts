import { SearchService } from './../../services/search/search.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from 'src/models/products/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) {
   }

  searchTerm$ = new Subject<string>();
  visibleList = false;

  @Output()
  searchResults = new EventEmitter<Array<Product>>();
  products = new Array<Product>(0);

  ngOnInit() {
    this.searchTerm$.asObservable().pipe(
      debounceTime(700)
    ).subscribe(partialName => {
      this.searchProductsByPartialName(partialName);
    });
  }

  private searchProductsByPartialName(partialName: string): void {
    // this.searchService.searchProductsByPartialName(partialName).subscribe(products => {
    //   console.info(`Был произведен поиск "${partialName}"`, products);
    //   this.searchResults.next(products);
    //   this.products = products;
    //   this.visibleList = products.length > 0;
    // });
  }
}
