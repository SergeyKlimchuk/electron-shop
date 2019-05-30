import { User } from './../../../../models/users/user';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { DeliveryAddress } from 'src/models/users/address';

import { DeliveryAddressService } from './../../../services/delivery-address/delivery-address.service';
import { UserService } from './../../../services/user/user.service';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.styl']
})
export class UserAddressesComponent implements OnInit {

  addresses: DeliveryAddress[] = [];
  address = new DeliveryAddress();
  currentUser = new User();
  visibleAddForm = false;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private deliveryAddressService: DeliveryAddressService) { }

  ngOnInit() {
    this.loadAddresses();
  }

  private loadAddresses() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.addresses = user.addresses;
        this.currentUser = user;
      }
    );
  }

  openAddPanel() {
    this.visibleAddForm = true;
  }

  closeAddPanel() {
    this.visibleAddForm = false;
    this.address = new DeliveryAddress();
  }

  createNewAddress() {
    this.visibleAddForm = false;
    this.address.user = this.currentUser;
    this.deliveryAddressService.saveAddress(this.address).subscribe(
      _ => {
        this.notificationService.notify('Адрес успешно сохранен!');
        this.closeAddPanel();
      },
      error => {
        this.notificationService.notifyAboutError('Во время сохранения удреса произошла ошибка', error);
      }
    );

  }

}
