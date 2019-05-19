import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';

import { CartService } from './../../services/cart/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.styl']
})
export class CartButtonComponent implements OnInit {

  private _productId: number;

  @Input()
  set productId(value: number) {
    this._productId = value;
    if (!value) {
      return;
    }
    this.userService.userIsAuthenticated().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.loadStatus();
        }
      }
    );
  }
  get productId() {
    return this._productId;
  }

  inCart = false;
  userIsAuthenticated = false;

  constructor(private userService: UserService,
              private cartService: CartService,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.userService.userIsAuthenticated().subscribe(
      isAuthenticated => this.userIsAuthenticated = isAuthenticated
    );
  }

  loadStatus() {
    this.cartService.checkInCart(this.productId).subscribe(
      result => this.inCart = result
    );
  }

  addToCart() {
    this.cartService.addProduct(this.productId).subscribe(
      () => this.inCart = true,
      error => {
        this.snack.open('При добавлении в корзину произошла ошибка!');
        console.error(error);
      }
    );
  }

  removeFromCart() {
    this.cartService.removeProduct(this.productId).subscribe(
      () => this.inCart = false,
      error => {
        this.snack.open('При удалении из корзины произошла ошибка!');
        console.error(error);
      }
    );
  }

}
