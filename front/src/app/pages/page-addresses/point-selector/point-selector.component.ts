import { Component, EventEmitter, Output } from '@angular/core';
import { Address } from 'src/models/map/address';
import { Country } from 'src/models/map/country';
import { MapState } from 'src/models/map/map-state';

import { City } from './../../../../models/map/city';
import { MapService } from './../../../services/map/map.service';
import { MapZoom } from 'src/models/map/map-zoom';

@Component({
  selector: 'app-point-selector',
  templateUrl: './point-selector.component.html',
  styleUrls: ['./point-selector.component.styl']
})
export class PointSelectorComponent {

  @Output()
  selectPoint = new EventEmitter<MapState>();

  countries$ = this.mapService.getCountries();
  selectedCountry: Country = null;
  selectedCity: City = null;
  selectedAddress: Address = null;

  constructor(private mapService: MapService) { }

  onChangeCountry() {
    this.selectedAddress = null;
    this.selectedCity = null;
  }

  onChangeCity() {
    if (this.selectedCity as any === -1) {
      this.selectPoint.emit({
        targetPoint: this.selectedCountry,
        markers: this.selectedCountry.cities,
        zoom: MapZoom.COUNTRY
      });
    } else {
      this.selectPoint.emit({
        targetPoint: this.selectedCity,
        markers: this.selectedCity.addresses,
        zoom: MapZoom.CITY
      });
      this.selectedAddress = null;
    }
  }

  onSelectAddress(address: Address) {
    this.selectPoint.emit({
      targetPoint: this.selectedAddress,
      markers: this.selectedCity.addresses,
      zoom: MapZoom.SHOP
    });
  }

}
