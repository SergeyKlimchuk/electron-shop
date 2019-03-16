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

// TODO: NEED TOTAL REFACTORING
@Component({
  selector: 'app-edit-product-type-dialog',
  templateUrl: './edit-product-type-dialog.html',
  styleUrls: ['./edit-product-type-dialog.styl']
})
export class EditProductTypeDialog {

  action: string;
  inputProductType: ProductType;
  productType: ProductType;
  imageUrl: string;
  entityChanged = false;

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
              @Inject(MAT_DIALOG_DATA) public data: ProductType,
              private fileService: FileService,
              private productTypeService: ProductTypeService,
              private productInfoTitleService: ProductInfoTitleService,
              private dictionaryService: DictionaryService,
              private snack: MatSnackBar) {
    if (data) {
      this.action = 'Редактирвоание типа продукта';
      this.productType = this.cloneProductType(data);
      this.loadProperties();
      this.imageUrl = data.imageUrl;
    } else {
      this.action = 'Добавление';
      this.productType = new ProductType();
    }
    this.loadDictionariesList();
    this.inputProductType = data;
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

  cloneProductType(productType: ProductType): ProductType {
    return Object.assign({}, productType);
  }

  selectNewImage() {
    this.selectImage.nativeElement.click();
    console.log('selectNewImage');
  }

  restoreImage() {
    this.imageUrl = this.productType.imageUrl;
    this.newImage = null;
  }

  onImageSelect(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log('result', reader.result);
        const imageWidth = this.image.nativeElement.offsetWidth;
        const imageHeight = this.image.nativeElement.offsetHeight;
        if (imageWidth > 100 && imageWidth < 200
          && imageHeight > 100 && imageHeight < 200) {
          this.imageUrl = reader.result.toString();
          this.newImage = event.target.files[0];
        } else {
          this.snack.open('Изобржение должно быть размеров [200-300]X[200-300]!', undefined, {duration: 7500});
        }
      };
    }
  }

  save() {
    if (this.newImage) {
      this.fileService.uploadFile(this.newImage).subscribe(
        (imageUrl) => {
          console.log('imageUrl', imageUrl);
          this.productType.imageUrl = imageUrl;
          this.closeWithSave(this.productType);
        },
        (error) => {
          alert('Не удалось сохранить сущность, смотрите консоль!');
          console.log('ERROR', error);
        }
      );
    } else {
      this.closeWithSave(this.productType);
    }
  }

  closeWithSave(productType: ProductType) {
    this.productType.titles = this.propertiesDataSource.data;
    this.productTypeService.saveProductType(productType).subscribe(
      (success) => {
        this.dialogRef.close(productType);
      },
      (error) => {
        alert('Не удалось сохранить!');
        console.error('ERROR WHILE SAVE', error);
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
