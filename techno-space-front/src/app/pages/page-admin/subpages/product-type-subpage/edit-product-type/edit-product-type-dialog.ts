import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { FileService } from './../../../../../services/file/file.service';
import { ProductType } from 'src/models/products/product-type';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  newImage: File = null;

  @ViewChild('selectImage') selectImage: ElementRef<HTMLElement>;

  constructor(public dialogRef: MatDialogRef<EditProductTypeDialog>,
              @Inject(MAT_DIALOG_DATA) public data: ProductType,
              private fileService: FileService,
              private productTypeService: ProductTypeService) {
    if (data) {
      this.action = 'Редактирвоание типа продукта';
      this.productType = this.cloneProductType(data);
      this.imageUrl = data.imageUrl;
    } else {
      this.action = 'Добавление';
      this.productType = new ProductType();
    }
    this.inputProductType = data;
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
        this.imageUrl = reader.result.toString();
        this.newImage = event.target.files[0];
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

  close() {
    this.dialogRef.close();
  }

}
