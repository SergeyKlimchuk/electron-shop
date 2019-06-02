import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProductInfoTitleService } from 'src/app/services/product-info-title/product-info-title.service';
import { FilterStep } from 'src/models/filters/filter-step';
import { ProductInfoTitle } from 'src/models/products/product-info-title';
import { ProductPropertyTitleType } from 'src/models/products/product-property-title-type';

import { BooleanInputComponent } from '../boolean-input/boolean-input.component';
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
  dictionaryValues: QueryList<DictionaryValueInputComponent>;

  @ViewChildren(BooleanInputComponent)
  booleanValues: QueryList<BooleanInputComponent>;

  @Output()
  apply = new EventEmitter<FilterStep[]>();

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
        this.titles = titles.filter(x => (x.type === ProductPropertyTitleType.Dictionary) || (x.type === ProductPropertyTitleType.Boolean));
        console.log(this.titles);
      },
      error => {
        console.error(error);
        this.snack.open('Не удалось получить заголовки для филттрации');
      }
    );
  }

  clearFilters() {
    this.applyButtonActive = false;
    this.dictionaryValues.forEach( x => x.clear() );
    this.booleanValues.forEach( x => x.clear() );
    this.apply.emit(null);
  }

  applyFilter() {
    const dictionaryValues = this.getDictionaryValues();
    const booleanValues = this.getBooleanValues();
    const values = dictionaryValues.concat(booleanValues);

    console.log({dictionaryValues, booleanValues, values});
    this.applyButtonActive = false;
    this.apply.emit(values);
  }

  getDictionaryValues(): FilterStep[] {
    const properties = this.titles.filter(x => x.type === ProductPropertyTitleType.Dictionary);
    let index = 0;
    return this.dictionaryValues
      .filter(x => x.getValues().length > 0)
      .map(x => {
        return {
          titleId: properties[index++].id,
          value: x.getValues()
        };
      });
  }

  getBooleanValues(): FilterStep[] {
    const booleanProperties = this.titles.filter(x => x.type === ProductPropertyTitleType.Boolean);
    let index = 0;
    return this.booleanValues
      .filter(x => x.state !== null)
      .map(x => {
        return {
          titleId: booleanProperties[index++].id,
          value: x.state
        };
      });
  }

  onChangeFilters() {
    this.applyButtonActive = true;
  }

}
