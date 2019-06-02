import { NotificationService } from 'src/app/services/notification/notification.service';
import { DeliveryAddressService } from './../../services/delivery-address/delivery-address.service';
import { DeliveryAddress } from 'src/models/users/address';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { SelectDeliveryAddressDialogComponent } from '../dialogs/select-delivery-address-dialog/select-delivery-address-dialog.component';

@Component({
  selector: 'app-select-delivery-address',
  templateUrl: './select-delivery-address.component.html',
  styleUrls: ['./select-delivery-address.component.styl']
})
export class SelectDeliveryAddressComponent implements OnInit {

  @Input()
  addresses: DeliveryAddress[] = [];

  @Input()
  address: DeliveryAddress;

  newAddress: DeliveryAddress;


  constructor(private matDialog: MatDialog,
              private deliveryAddressService: DeliveryAddressService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  openSelectDialog() {
    this.matDialog.open(SelectDeliveryAddressDialogComponent, { data: {addresses: this.addresses} }).afterClosed().subscribe(
      address => {
        if (address) {
          this.address = address;
        }
      }
    );
  }

  createNewAddress() {
    this.newAddress = new DeliveryAddress();
  }

  saveNewAddress() {
    this.deliveryAddressService.saveAddress(this.newAddress).subscribe(
      () => {
        this.notificationService.notify('Новый адрес успешно добавлен!');
      },
      error => {
        this.notificationService.notifyAboutError('Не удалось сохранить новый адрес!', error);
      }
    );
  }

}
