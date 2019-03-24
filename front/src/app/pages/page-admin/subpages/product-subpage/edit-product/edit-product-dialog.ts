import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Subject, BehaviorSubject } from 'rxjs';
import { LoadableImageComponent } from 'src/app/core/loadable-image/loadable-image.component';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/models/products/product';
import { ProductType } from 'src/models/products/product-type';
import { ProductPropertyValueEditorComponent } from 'src/app/core/product-property-value-editor/product-property-value-editor.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-dialog.html',
  styleUrls: ['./edit-product-dialog.styl']
})
export class EditProductDialog {

  product: Product;

  @ViewChild(LoadableImageComponent)
  loadableImage: LoadableImageComponent;

  @ViewChild(ProductPropertyValueEditorComponent)
  propertyEditor: ProductPropertyValueEditorComponent;

  productTypes$ = new Subject<ProductType[]>();
  selectedProductTypeId$ = new BehaviorSubject<number>(null);

  action: string;

  constructor(public dialogRef: MatDialogRef<EditProductDialog>,
              @Inject(MAT_DIALOG_DATA) public productId: number,
              private productService: ProductService,
              private snack: MatSnackBar,
              private productTypeService: ProductTypeService) {

    if (productId == null) {
      this.action = 'Создание товара';
      this.product = new Product();
    } else {
      this.action = 'Редактирование товара';
      this.loadProduct(productId);
    }

    this.loadProductTypes();
  }

  loadProduct(productId: number) {
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        // TODO: Отсылаться то отсылается, но вот не принимается компонентом. Подписка есть.
        console.log('Отправлено значение', product.productType.id);
        this.selectedProductTypeId$.next(product.productType.id);
      },
      error => {
        alert('Ошибка');
        console.error(error);
      }
    );
  }

  loadProductTypes() {
    this.productTypeService.getProductTypes(0, 30).subscribe(
      productTypes => {
        this.productTypes$.next(productTypes.content);
        console.log('Загружены типы продуктов', productTypes.content);
      },
      error => {
        alert('Ошибка');
        console.error(error);
      }
    );
  }

  onSelectProductType(productTypeId: number) {
    console.log('INFO', productTypeId);
    this.selectedProductTypeId$.next(productTypeId);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveProduct() {
    if (!this.loadableImage.isValid()) {
      this.snack.open('Требуется загрузить изображение!');
      return;
    }

    if (!this.propertyEditor.isValid()) {
      this.snack.open('Требуется заполнить все поля свойств!');
      return;
    }

    await this.loadableImage.uploadImage();
    this.productService.saveProduct(this.product).subscribe(
      product => {
        this.snack.open('Успешно сохранено!');
        this.dialogRef.close(product);
      },
      error => {
        console.error(error);
        alert('Ошибочка при сохранении продукта!');
      }
    );
  }

}
