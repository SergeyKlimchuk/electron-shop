import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Action } from 'src/models/actions/actions';
import { Product } from 'src/models/products/product';
import { ProductProperty } from 'src/models/products/product-property';

import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.styl']
})
export class PageProductComponent implements OnInit {

  product: Product = new Product();
  productInCart = false;
  displayedColumns = ['name', 'value'];
  properties: ProductProperty[];
  bestAction = new Action();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snack: MatSnackBar,
              private productService: ProductService,
              private userService: UserService,
              private cartService: CartService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.productService.getProduct(Number(productId)).pipe(
      tap(product => this.product = product),
      tap(() => this.applyproductProperties()),
    ).subscribe(
      (product) => {
        if (this.userService.userIsAuthenticated()) {
          this.checkProductInCart();
        }
      },
      (error) => {
        console.error(error);
        this.snack.open('Произошла ошибка при получении информации о продукте!');
      }
    );
  }

  checkProductInCart() {
    this.cartService.getProducts().subscribe(
      productsInCart => {
        this.productInCart = productsInCart.some(x => x.id === this.product.id);
      },
      error => {
        console.error('Произошла ошибка при получении списка товаров в корзине!', error);
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

  cartAction() {
    if (this.productInCart) {
      this.removeFromCart();
    } else {
      this.addToCart();
    }
  }

  addToCart() {
    this.cartService.addProduct(this.product.id).subscribe(
      () => {
        this.productInCart = true;
      },
      error => {
        console.error(error);
        this.snack.open('Произошла ошибка при добавлении в корзину!');
      }
    );
  }

  removeFromCart() {
    this.cartService.removeProduct(this.product.id).subscribe(
      () => {
        this.productInCart = false;
      },
      error => {
        console.error(error);
        this.snack.open('Произошла ошибка при удалинеии товраа из корзины!');
      }
    );
  }

}
