import { PayService } from './../../services/pay/pay.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Product } from 'src/models/products/product';

import { CartService } from './../../services/cart/cart.service';

@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.styl']
})
export class PageCartComponent implements OnInit {

  productsDataSource = new MatTableDataSource<{ product: Product, count: number }>();
  totalPrice = 0;

  constructor(private snack: MatSnackBar,
              private cartService: CartService,
              private payService: PayService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(
      products => {
        this.productsDataSource.data = products.map(x => {
          return { product: x, count: 1 };
        });
        this.onChangeProductsCount();
      },
      error => {
        const message = 'При получении товаров в корзине произошла ошибка!';
        this.snack.open(message);
        console.error(message, error);
      }
    );
  }

  onChangeProductsCount() {
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = 0;
    const data = this.productsDataSource.data;
    if (data) {
      this.totalPrice = data.reduce( (prior, row) => row.product.price * row.count + prior, 0);
    }
  }

  clearCart() {
    this.cartService.clearCart().subscribe(
      () => {
        this.productsDataSource.data = [];
        this.updateTotalPrice();
      },
      error => {
        const message = 'При получении товаров в корзине произошла ошибка!';
        this.snack.open(message);
        console.error(message, error);
      }
    );
  }

  pay() {
    const productIds = this.productsDataSource.data.map(x => x.product.id);
    this.payService.generatePayLink(productIds).subscribe(
      payLink => {
        console.log('Link: ', payLink);
        window.location.href = payLink;
      },
      error => {
        const message = 'При получении ссылки на оплату произошла ошибка!';
        this.snack.open(message);
        console.error(message, error);
      }
    );
  }

}
