import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DeliveryAddress } from './../../../../models/users/address';
import { UserService } from './../../../services/user/user.service';

@Component({
  selector: 'app-select-delivery-address-dialog',
  templateUrl: './select-delivery-address-dialog.component.html',
  styleUrls: ['./select-delivery-address-dialog.component.styl']
})
export class SelectDeliveryAddressDialogComponent {

  addresses: DeliveryAddress[] = [];

  constructor(public dialogRef: MatDialogRef<SelectDeliveryAddressDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService) {
    this.addresses = data.addresses;
  }

  selectAddress(address: DeliveryAddress) {
    this.dialogRef.close(address);
  }

  close() {
    this.dialogRef.close();
  }

}
