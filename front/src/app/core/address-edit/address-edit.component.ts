import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapService } from './../../services/map/map.service';
import { Component, OnInit, Input } from '@angular/core';
import { DeliveryAddress } from 'src/models/users/address';
import { City } from 'src/models/map/city';
import { NotificationService } from 'src/app/services/notification/notification.service';

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
    this.mapService.getCountries().subscribe(
      countries => {
        const cities: City[] = [];
        // TODO: FIX THIS WARNING!!!
        // countries.forEach(x => x.cities.forEach(x1 => cities.push(x1)));
        this.cities = cities;
      },
      error => {
        this.notificationService.notifyAboutError('Не удалось получить список городов!', error);
      }
    );
  }

  writeValue(address: DeliveryAddress): void {
    this.address = address;
  }
  registerOnChange(fn: any): void {
    this.updateFn = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  updateValue() {
    console.log('WAS UPDATED');

    this.updateFn(this.address);
  }
}
