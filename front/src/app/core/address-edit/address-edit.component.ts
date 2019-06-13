import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { City } from 'src/models/map/city';
import { DeliveryAddress } from 'src/models/users/address';

import { MapService } from './../../services/map/map.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: AddressEditComponent, multi: true },
  ],
  styleUrls: ['./address-edit.component.styl']
})
export class AddressEditComponent implements OnInit, ControlValueAccessor {

  address: DeliveryAddress;
  updateFn: (DeliveryAddress) => void;

  cities: City[] = [];

  constructor(private mapService: MapService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadCities();
  }

  private loadCities() {
    this.mapService.getAllCities().subscribe(
      cities => {
        this.cities = cities;
        this.applyCitiesReferences();
      },
      error => {
        this.notificationService.notifyAboutError('Не удалось получить список городов!', error);
      }
    );
  }

  applyCitiesReferences() {
    try {
      this.address.city = this.cities.filter(x => x.id === this.address.city.id)[0];
    } catch {
    }
  }

  writeValue(address: DeliveryAddress): void {
    this.address = address;
    this.applyCitiesReferences();
  }
  registerOnChange(fn: any): void {
    this.updateFn = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  updateValue() {
    this.updateFn(this.address);
  }
}
