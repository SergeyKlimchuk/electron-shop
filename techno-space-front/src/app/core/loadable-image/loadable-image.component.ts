import { FileService } from './../../services/file/file.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-loadable-image',
  templateUrl: './loadable-image.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: LoadableImageComponent, multi: true },
  ],
  styleUrls: ['./loadable-image.component.styl']
})
export class LoadableImageComponent implements ControlValueAccessor {

  constructor(private snack: MatSnackBar,
              private fileService: FileService) { }

  @Input()
  dafaultImage: string = null;
  @ViewChild('selectImage') selectImageElement: ElementRef<HTMLElement>;
  @ViewChild('image') image: ElementRef<HTMLElement>;

  imageUrl = '';
  oldImageUrl: string = null;
  newImage: File;

  private onChange: (value: string) => void;

  public async uploadImage() {
    return await this.fileService.uploadFile(this.newImage).pipe(
      tap(this.onChange)
    ).toPromise();
  }

  writeValue(newUrl: string): void {
    if (!this.oldImageUrl) {
      this.oldImageUrl = newUrl;
    }
    if (newUrl != null && newUrl !== '') {
      this.imageUrl = newUrl;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('1');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('2');
  }



  selectNewImage() {
    this.selectImageElement.nativeElement.click();
    console.log('selected new image');
  }

  restoreImage() {
    this.imageUrl = this.oldImageUrl;
    console.log('restore image');
  }

  onImageWasBroken(event: any) {
    console.log('errorEvent', event);
  }

  onImageSelect(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log('result', reader);
        const imageWidth = this.image.nativeElement.offsetWidth;
        const imageHeight = this.image.nativeElement.offsetHeight;
        if (imageWidth >= 100 && imageWidth <= 200
          && imageHeight >= 100 && imageHeight <= 200) {
          this.imageUrl = reader.result.toString();
          this.newImage = event.target.files[0];
        } else {
          this.snack.open('Изобржение должно быть размеров [200-300]X[200-300]!', undefined, {duration: 7500});
        }
      };
    }
  }

}
