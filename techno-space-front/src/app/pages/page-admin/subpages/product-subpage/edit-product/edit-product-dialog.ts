import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';
import { Subject } from 'rxjs';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSnackBar } from '@angular/material';
import { LoadableImageComponent } from 'src/app/core/loadable-image/loadable-image.component';
import { ProductInfoTitleService } from 'src/app/services/product-info-title/product-info-title.service';
import { ProductInfoValueService } from 'src/app/services/product-info-value/product-info-value.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/models/products/product';
import { ProductInfoTitle } from 'src/models/products/product-info-title';

import { ProductInfoValue } from './../../../../../../models/products/product-info-text';
import { ProductType } from 'src/models/products/product-type';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-dialog.html',
  styleUrls: ['./edit-product-dialog.styl']
})
export class EditProductDialog implements OnInit {

  @ViewChild(LoadableImageComponent)
  loadableImage: LoadableImageComponent;

  product: Product;
  productTypes$ = new Subject<ProductType[]>();

  action: string;
  propertiesDataSource = new MatTableDataSource<{title: ProductInfoTitle, value: ProductInfoValue}>();
  displayedCollumns = ['title', 'value'];

  constructor(public dialogRef: MatDialogRef<EditProductDialog>,
              @Inject(MAT_DIALOG_DATA) public productId: number,
              private productService: ProductService,
              private snack: MatSnackBar,
              private dictionaryService: DictionaryService,
              private productTypeService: ProductTypeService,
              private productInfoTitleService: ProductInfoTitleService,
              private productInfoValueService: ProductInfoValueService) {

    if (productId == null) {
      this.action = 'Создание товара';
      this.product = new Product();
    } else {
      this.action = 'Редактирование товара';
      this.productService.getProduct(productId).subscribe(
        product => {
          this.product = product;
          this.loadProperties();
        },
        error => {
          alert('Ошибка');
          console.error(error);
        }
      );
    }

    this.loadProductTypes();
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

  onSelectProductType(productType: ProductType) {
    if (productType === undefined) {
      console.log('undefined');
      return;
    }
    console.log('selected produtType', productType);
    this.product.productType = productType;
    console.log('Начата загрузка свойств', productType);
    this.loadProperties();
  }

  async loadProperties() {
    const productTypeId = this.product.productType.id;
    const titles = await this.productInfoTitleService.getProductInfoTitles(productTypeId).toPromise();
    if (this.productId == null) {
      this.updateDataSource(titles, null);
    } else {
      const values = await this.productInfoValueService.getProductInfoValues(this.productId).toPromise();
      this.updateDataSource(titles, values);
    }
  }

  updateDataSource(titles: ProductInfoTitle[], values: ProductInfoValue[]) {
    if (values == null) {
      this.propertiesDataSource.data = titles.map(title => {
        return { title, value: { title, product: null, id: null, value: null } };
      });
    } else {
      this.propertiesDataSource.data = titles.map(title => {
        const result = values.find(x => x.title.id === title.id);
        const value = result ? result : { title, product: null, id: null, value: null };
        return { title, value };
      });
    }
  }

  getDictionaryValues(dictionaryId: number) {
    return this.dictionaryService.getDictionaryValues(dictionaryId);
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveProduct() {
    await this.loadableImage.uploadImage();
    this.product.values = this.propertiesDataSource.data.map(x => x.value);
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
