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
        this.loadAddresses();
        this.closeAddPanel();
      },
      error => {
        this.notificationService.notifyAboutError('Во время сохранения удреса произошла ошибка', error);
      }
    );
  }

  updateAddress(address: DeliveryAddress) {
    this.deliveryAddressService.updateAddress(address).subscribe(
      () => {
        this.notificationService.notify('Адрес успешно обновлен!');
      },
      error => {
        this.notificationService.notifyAboutError('При обновлении адреса произошла ошибка!', error);
      }
    );
  }

  deleteAddress(address: DeliveryAddress) {
    this.deliveryAddressService.deleteAddress(address.id).subscribe(
      () => {
        this.addresses = this.addresses.filter(x => x.id !== address.id);
        this.notificationService.notify('Адрес успешно удален!');
      },
      error => {
        this.notificationService.notifyAboutError('При удалении адреса произошла ошибка!', error);
      }
    );
  }

  setFavorite(address: DeliveryAddress) {
    this.deliveryAddressService.setFavoriteAddress(address.id).subscribe(
      () => {
        this.notificationService.notify('Первичный адрес был успешно обновлен!');
        this.loadAddresses();
      },
      error => {
        this.notificationService.notifyAboutError('Не удалось удалить первичный адресс!', error);
      }
    );
  }

}
