import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/products/product';
import { DeliveryAddress } from 'src/models/users/address';
import { CartService } from 'src/app/services/cart/cart.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-payment',
  templateUrl: './page-payment.component.html',
  styleUrls: ['./page-payment.component.styl']
})
export class PagePaymentComponent implements OnInit {

  products: Product[] = [];
  selectedAddress: DeliveryAddress;

  addresses: DeliveryAddress[] = [];

  constructor(private cartService: CartService,
              private notificationService: NotificationService,
              private userService: UserService) { }

  ngOnInit() {
    this.loadPRoducts();
    this.loadUserAddresses();
  }

  private loadPRoducts() {
    this.cartService.getProducts().subscribe(
      products => this.products = products,
      error => {
        this.notificationService.notifyAboutError('При получении списка товаров в корзине произошла ошибка!', error);
      }
    );
  }

  private loadUserAddresses() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.addresses = user.addresses;
        this.selectedAddress = user.addresses.filter(x => x.favorite)[0];
      },
      error => {
        this.notificationService.notifyAboutError('Не удлось получить адреса доставки пользователя', error);
      }
    );
  }

}
