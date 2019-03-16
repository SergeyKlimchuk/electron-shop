import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';
import { ProductInfoTitleService } from 'src/app/services/product-info-title/product-info-title.service';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { ProductInfoTitle } from 'src/models/products/product-info-title';
import { ProductPropertyTitleType } from 'src/models/products/product-property-title-type';
import { ProductType } from 'src/models/products/product-type';

import { Dictionary } from './../../../../../../models/dictionaries/dictionary';
import { FileService } from './../../../../../services/file/file.service';
import { LoadableImageComponent } from 'src/app/core/loadable-image/loadable-image.component';

// TODO: NEED TOTAL REFACTORING
@Component({
  selector: 'app-edit-product-type-dialog',
  templateUrl: './edit-product-type-dialog.html',
  styleUrls: ['./edit-product-type-dialog.styl']
})
export class EditProductTypeDialog {

  action: string;
  productType: ProductType;
  entityChanged = false;

  @ViewChild(LoadableImageComponent)
  imageComponent: LoadableImageComponent;

  displayedColumns = ['name', 'type', 'remove'];
  propertiesDataSource = new MatTableDataSource<ProductInfoTitle>();
  dictionariesList = new Array<Dictionary>();
  allowedTypeValues = [
    { value: ProductPropertyTitleType.String, text: 'Строка'},
    { value: ProductPropertyTitleType.Integer, text: 'Число'},
    { value: ProductPropertyTitleType.Dictionary, text: 'Справочник'},
    { value: ProductPropertyTitleType.Boolean, text: 'Да/Нет'}
  ];

  newImage: File = null;

  @ViewChild('selectImage') selectImage: ElementRef<HTMLElement>;
  @ViewChild('image') image: ElementRef<HTMLElement>;

  constructor(public dialogRef: MatDialogRef<EditProductTypeDialog>,
              @Inject(MAT_DIALOG_DATA) public productTypeId: number,
              private fileService: FileService,
              private productTypeService: ProductTypeService,
              private productInfoTitleService: ProductInfoTitleService,
              private dictionaryService: DictionaryService,
              private snack: MatSnackBar) {
    if (productTypeId == null) {
      this.action = 'Добавление';
      this.productType = new ProductType();
    } else {
      this.action = 'Редактирвоание типа продукта';
      this.productTypeService.getProductType(productTypeId).subscribe(
        productType => {
          console.log('productType was loaded', productType);
          this.productType = productType;
          this.loadProperties();
        },
        error => {
          console.error(error);
          this.snack.open('Произошла ошибка при получения типа продукта!');
        }
      );
    }
    this.loadDictionariesList();
  }

  loadProperties() {
    this.productInfoTitleService.getProductInfoTitles(this.productType.id).subscribe(
      (properties) => {
        console.log('Свойства загружены ', properties);
        this.propertiesDataSource.data = properties;
      },
      (error) => {
        alert('Не удалось загрузить свйоства, смотрите консоль!');
        console.log('ERROR', error);
      }
    );
  }

  loadDictionariesList() {
    this.dictionaryService.getDictionaries(0, 50).subscribe(
      dictionaries => {
        console.log('Справочники', dictionaries.content);
        this.dictionariesList = dictionaries.content;
      },
      error => {
        alert('Не удалось сохранить сущность, смотрите консоль!');
        console.log('ERROR', error);
      }
    );
  }

  async save() {
    if (!this.imageComponent.isValid() || !this.productType.name) {
      this.snack.open('Не все поля были заполнены!');
      return;
    }

    await this.imageComponent.uploadImage();
    this.productType.titles = this.propertiesDataSource.data;
    this.productTypeService.saveProductType(this.productType).subscribe(
      (productType) => {
        this.snack.open('Успешно сохранено!');
        this.dialogRef.close(productType);
      },
      error => {
        console.error(error);
        this.snack.open('При сохранении произошла ошибка!');
      }
    );
  }

  addNewProperty() {
    const property = new ProductInfoTitle();
    property.name = '';
    // Костыль, т.к. форма не отлавливает на добавление через push
    const data = this.propertiesDataSource.data;
    data.push(property);
    this.propertiesDataSource.data = data;
  }

  close() {
    this.dialogRef.close();
  }

  onChangeSelectedType(property: ProductInfoTitle, newValue: ProductPropertyTitleType) {
    console.log(property, newValue);
    if (newValue !== undefined ) {
      if (newValue === ProductPropertyTitleType.Dictionary) {
        if (property.dictionary == null) {
          property.dictionary = this.dictionariesList[0];
        }
      } else {
        property.dictionary = null;
      }
    }
  }

  deleteProperty(property: ProductInfoTitle) {
    const propertyAsJSON = JSON.stringify(property);
    console.log(propertyAsJSON);
    let wasDeleted = false;
    this.propertiesDataSource.data = this.propertiesDataSource.data.filter(x => {
      if (wasDeleted) {
        return true;
      }
      if (propertyAsJSON === JSON.stringify(x)) {
        return !(wasDeleted = true);
      }
      return true;
    });
  }

}
