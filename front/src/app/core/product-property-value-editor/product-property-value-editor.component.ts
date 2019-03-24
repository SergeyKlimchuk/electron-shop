import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ProductInfoValueService } from 'src/app/services/product-info-value/product-info-value.service';
import { ProductInfoValue } from 'src/models/products/product-info-text';
import { ProductInfoTitle } from 'src/models/products/product-info-title';

import { DictionaryValueInputComponent } from '../dictionary-value-input/dictionary-value-input.component';
import { ProductInfoTitleService } from './../../services/product-info-title/product-info-title.service';

@Component({
  selector: 'app-product-property-value-editor',
  templateUrl: './product-property-value-editor.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ProductPropertyValueEditorComponent, multi: true },
  ],
  styleUrls: ['./product-property-value-editor.component.styl']
})
export class ProductPropertyValueEditorComponent implements OnInit, ControlValueAccessor {

  // Должен уметь работать с новыми продуктами.
  // Должен уметь редактировать существующие продукты.
  @Input()
  productTypeId$: Observable<number>;

  @Input()
  productId: number;

  onChange: (value: ProductInfoValue[]) => void;
  dataSource = new MatTableDataSource<{title: ProductInfoTitle, value: ProductInfoValue}>();
  displayedCollumns = ['title', 'value'];

  @ViewChildren(DictionaryValueInputComponent)
  dictionaryValues: QueryList<DictionaryValueInputComponent>;
  @ViewChildren(MatInput)
  textValues: QueryList<MatInput>;

  constructor(private productInfoTitleService: ProductInfoTitleService,
              private productInfoValueService: ProductInfoValueService) { }

  async ngOnInit(): Promise<void> {
    if (!this.productTypeId$) {
      throw new Error('Component required "productId" or "productTypeId"');
    }

    this.productTypeId$.subscribe(
      productTypeId => this.onProductTypeIdWasUpdated(productTypeId)
    );
  }

  isValid() {
    let result = true;
    if (this.dictionaryValues) {
      result = result && this.dictionaryValues.toArray().every(x => x.isValid());
    }

    if (this.textValues) {
      result = result && this.textValues.toArray().every(x => x.value.length > 0);
    }
    return result;
  }

  async onProductTypeIdWasUpdated(productTypeId: number) {
    if (!productTypeId) {
      this.dataSource.data = null;
      return;
    }

    const titles = await this.productInfoTitleService.getProductInfoTitles(productTypeId).toPromise();

    if (this.productId) {
      const values = await this.productInfoValueService.getProductInfoValues(this.productId).toPromise();
      this.updateDataSource(titles, values);
    } else {
      this.updateDataSource(titles, null);
    }
  }

  onValueUpdate() {
    if (this.onChange) {
      this.onChange(this.dataSource.data.map(x => x.value));
    }
  }

  updateDataSource(titles: ProductInfoTitle[], values: ProductInfoValue[]) {
    if (values) {
      this.dataSource.data = titles.map(title => {
        const result = values.find(x => x.title.id === title.id);
        const value = result ? result : { title, product: null, id: null, value: null };
        return { title, value };
      });
    } else {
      this.dataSource.data = titles.map(title => {
        const value = new ProductInfoValue();
        value.title = title;
        return { title, value };
      });
    }
    this.onValueUpdate();
  }

  writeValue(newValues: ProductInfoValue[]): void {
    console.log('Принято значение в компонент, но было проигнорировано', newValues);
  }
  registerOnChange(fn: (value: ProductInfoValue[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState');
  }

}
