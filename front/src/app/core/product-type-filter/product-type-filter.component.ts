import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProductInfoTitleService } from 'src/app/services/product-info-title/product-info-title.service';
import { SearchRequestSegment } from 'src/app/services/search/search-request-segment';
import { ProductInfoTitle } from 'src/models/products/product-info-title';
import { ProductPropertyTitleType } from 'src/models/products/product-property-title-type';

import { DictionaryValueInputComponent } from '../dictionary-value-input/dictionary-value-input.component';

@Component({
  selector: 'app-product-type-filter',
  templateUrl: './product-type-filter.component.html',
  styleUrls: ['./product-type-filter.component.styl']
})
export class ProductTypeFilterComponent implements OnInit {

  @Input()
  productTypeId: number;

  @ViewChildren(DictionaryValueInputComponent)
  values: QueryList<DictionaryValueInputComponent>;

  @Output()
  apply = new EventEmitter<SearchRequestSegment[]>();

  @Output()
  clean = new EventEmitter<void>();

  applyButtonActive = false;

  titles: ProductInfoTitle[];

  constructor(private productInfoTitleService: ProductInfoTitleService,
              private snack: MatSnackBar) {
  }

  ngOnInit() {
    this.loadTitlesWithDictionary();
  }

  loadTitlesWithDictionary() {
    this.productInfoTitleService.getProductInfoTitles(this.productTypeId).subscribe(
      titles => {
        this.titles = titles.filter(x => x.type === ProductPropertyTitleType.Dictionary);
      },
      error => {
        console.error(error);
        this.snack.open('Не удалось получить заголовки для филттрации');
      }
    );
  }

  clearFilters() {
    this.applyButtonActive = false;
    this.values.forEach( x => x.clear() );
    this.apply.emit(null);
  }

  applyFilter() {
    let index = 0;
    const valuesList = this.values.toArray();
    const values = this.titles.map(title => {
      return {
        titleId: title.id,
        values: valuesList[index++].getValues().map(x => Number(x))
      };
    }).filter(value => value.values.length > 0);
    this.applyButtonActive = false;
    this.apply.emit(values);
  }

  onChangeFilters() {
    this.applyButtonActive = true;
  }

}
