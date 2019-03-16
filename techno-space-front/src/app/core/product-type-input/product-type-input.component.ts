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
  selected: ProductType;
  private onChangeHandler: (value: ProductType) => void;

  @Output() change = new EventEmitter<ProductType>();

  constructor(private productTypeService: ProductTypeService,
              private snack: MatSnackBar) {
    this.loadProductTypes();
  }

  loadProductTypes() {
    this.productTypeService.getProductTypes(0, 50).subscribe(
      productTypes => {
        console.log('productTypes', productTypes);

        this.productTypes = productTypes.content;
        if (productTypes.content.length > 0) {
          this.selected = productTypes.content[0];
          this.change.emit(this.selected);
        }
      },
      error => {
        const errorMessage = 'Ошибка при получении списка типов продукта!';
        this.snack.open(errorMessage);
        console.error(errorMessage, error);
      }
    );
  }

  onValueChange(newProductType: ProductType) {
    this.onChangeHandler(newProductType);
    this.change.emit(newProductType);
  }

  writeValue(newProductType: ProductType): void {
    this.selected = newProductType;
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
