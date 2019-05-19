import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Action } from 'src/models/actions/actions';
import { Product } from 'src/models/products/product';
import { ProductProperty } from 'src/models/products/product-property';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.styl']
})
export class PageProductComponent implements OnInit {

  product: Product = new Product();
  displayedColumns = ['name', 'value'];
  properties: ProductProperty[];
  bestAction = new Action();

  userIsAuthenticated = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snack: MatSnackBar,
              private productService: ProductService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.applyproductProperties();
      },
      (error) => {
        console.error(error);
        this.snack.open('Произошла ошибка при получении информации о продукте!');
      }
    );
  }

  redirectToMain() {
    this.router.navigate(['/main']);
  }

  async applyproductProperties() {
    this.productService.getProductProperties(this.product.id).subscribe(
      (properties) => {
        this.properties = new Array<ProductProperty>();
        this.properties = properties.map(x => {
          if (x.value === 'true') {
            x.value = 'Да';
          } else if (x.value === 'false') {
            x.value = 'Нет';
          }
          return x;
        });
      },
      (error) => {
        console.error('Не удалось получить свойства товара!', error);
      }
    );
  }
}
