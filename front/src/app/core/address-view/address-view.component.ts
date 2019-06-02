import { NotificationService } from 'src/app/services/notification/notification.service';
import { City } from 'src/models/map/city';
import { MapService } from './../../services/map/map.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeliveryAddress } from 'src/models/users/address';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.styl']
})
export class AddressViewComponent implements OnInit {

  @Input()
  editable = false;

  @Input()
  selectable = false;

  @Input()
  address: DeliveryAddress;
  addressBackup: DeliveryAddress;

  @Output()
  applyChanges = new EventEmitter<DeliveryAddress>();

  @Output()
  delete = new EventEmitter();

  @Output()
  enableFavorite = new EventEmitter<DeliveryAddress>();

  editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  enableEditMode() {
    this.editMode = true;
    this.addressBackup = this.address;
    this.address = Object.assign({}, this.address);

  }

  closeEditMode() {
    this.editMode = false;
    this.address = this.addressBackup;
  }

  save() {
    this.editMode = false;
    this.applyChanges.emit(this.address);
  }

  deleteAddress() {
    this.editMode = false;
    this.delete.emit(this.address);
  }

  setFavorite() {
    if (!this.address.favorite) {
      this.address.favorite = true;
      this.enableFavorite.emit(this.address);
    }
  }

  disableFavorite() {
    this.address.favorite = false;
  }
}
