import { Action } from './../../../models/actions/actions';
import { ActionService } from './../../services/action/action.service';
import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/models/products/product-type';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { SliderPage } from 'src/app/core/slider/slider-page';

@Component({
  selector: 'app-page-product-group',
  templateUrl: './page-product-group.component.html',
  styleUrls: ['./page-product-group.component.styl']
})
export class PageProductGroupComponent implements OnInit {

  productsTypes = new Array<ProductType>();
  sliderPages = new Array<SliderPage>();

  constructor(private productService: ProductTypeService,
              private actionService: ActionService) {
    this.loadProductTypes();
    this.loadActions();
  }

  loadProductTypes() {
    this.productService.getProductTypes().subscribe(
      (response) => {
        this.productsTypes = response;
      },
      (error) => {
        console.error('Не удалось получить типы продуктов!', error);
      }
    );
  }

  loadActions() {
    this.actionService.getActiveActions().subscribe(
      (response) => {
        response.forEach(action => {
          console.log('Получил список акций', response.length);
          this.sliderPages.push({
            url: `actions/${action.id}`,
            imgUrl: action.imageUrl
          });
        });
      },
      (error) => {
        console.error('Не удалось получить список акций используя дефолтные значения.', error);
      }
    );
  }

  ngOnInit() {
  }

}
