import { Component, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { ProductType } from 'src/models/products/product-type';

@Component({
  selector: 'app-product-type-input',
  templateUrl: './product-type-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ProductTypeInputComponent, multi: true },
  ],
  styleUrls: ['./product-type-input.component.styl']
})
export class ProductTypeInputComponent implements ControlValueAccessor {

  productTypes: ProductType[] = null;
  selectedProductTypeId: number;
  private onChangeHandler: (value: ProductType) => void;

  @Output() change = new EventEmitter<number>();

  constructor(private productTypeService: ProductTypeService,
              private snack: MatSnackBar) {
    this.loadProductTypes();
  }

  loadProductTypes() {
    this.productTypeService.getProductTypes(0, 50).subscribe(
      productTypes => {
        this.productTypes = productTypes.content;
        if (productTypes.content.length > 0) {
          if (!this.selectedProductTypeId) {
            const selected = productTypes.content[0];
            this.selectedProductTypeId = selected.id;
            this.change.emit(this.selectedProductTypeId);
            this.onChangeHandler(selected);
          }
        }
      },
      error => {
        const errorMessage = 'Ошибка при получении списка типов продукта!';
        this.snack.open(errorMessage);
        console.error(errorMessage, error);
      }
    );
  }

  onValueChange(newProductTypeId: number) {
    console.log('WARN [newProductTypeId]', newProductTypeId);
    if (newProductTypeId) {
      const selectedType = this.productTypes.find(x => x.id === newProductTypeId);
      console.log('selectedType', selectedType);
      this.onChangeHandler(selectedType);
      this.change.emit(newProductTypeId);
    }
  }

  writeValue(newProductType: ProductType): void {
    if (newProductType) {
      this.selectedProductTypeId = newProductType.id;
    } else {
      this.selectedProductTypeId = null;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeHandler = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('1');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('2');
  }

}
