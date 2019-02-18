import { SearchService } from './../../services/search/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  public keyPress(event: Event) {
    console.log('event', event);
    this.searchService.searchProductsByName('Hello');
  }

}
