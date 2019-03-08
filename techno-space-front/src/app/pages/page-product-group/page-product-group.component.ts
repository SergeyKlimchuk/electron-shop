import { Subject } from 'rxjs';
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

  public productsTypes = new Subject<ProductType[]>();
  sliderPages = new Array<SliderPage>();
  productTypesNotFound = true;

  constructor(private productService: ProductTypeService,
              private actionService: ActionService) {
    this.loadProductTypes();
    this.loadActions();
  }

  loadProductTypes() {
    this.productService.getProductTypes().subscribe(
      (productsTypes) => {
        console.log('Загружены типы продуктов!', productsTypes);
        this.productsTypes.next(productsTypes.content);
        console.log('After next.');
        this.productTypesNotFound =  productsTypes.content.length === 0;
      },
      (error) => {
        console.error('Не удалось получить типы продуктов!', error);
      }
    );
  }

  loadActions() {
    this.actionService.getActiveActions().subscribe(
      (response) => {
        // TODO: ERROR TypeError: "response.forEach is not a function"
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
