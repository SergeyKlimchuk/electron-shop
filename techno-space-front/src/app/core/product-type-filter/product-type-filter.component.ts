import { Component, Input, OnInit } from '@angular/core';
import { ProductInfoTitleService } from 'src/app/services/product-info-title/product-info-title.service';
import { ProductInfoTitle } from 'src/models/products/product-info-title';
import { MatSnackBar } from '@angular/material';
import { ProductPropertyTitleType } from 'src/models/products/product-property-title-type';

@Component({
  selector: 'app-product-type-filter',
  templateUrl: './product-type-filter.component.html',
  styleUrls: ['./product-type-filter.component.styl']
})
export class ProductTypeFilterComponent implements OnInit {

  @Input()
  productTypeId: number;

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
        this.titles = titles.filter(x => x.type === ProductPropertyTitleType.Dictionary);
      },
      error => {
        console.error(error);
        this.snack.open('Не удалось получить заголовки для филттрации');
      }
    );
  }

}
