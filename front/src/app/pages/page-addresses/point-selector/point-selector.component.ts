import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/models/map/country';

import { City } from './../../../../models/map/city';
import { MapService } from './../../../services/map/map.service';

@Component({
  selector: 'app-point-selector',
  templateUrl: './point-selector.component.html',
  styleUrls: ['./point-selector.component.styl']
})
export class PointSelectorComponent implements OnInit {

  @Output()
  selectCity = new EventEmitter<City>();

  @Output()
  unselectCity = new EventEmitter<void>();

  countries$ = this.mapService.getCountries();
  selectedCountry: Country;
  selectedCity: City;
  cityIsSelected = false;

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  onSelectCountry() {
    if (this.cityIsSelected) {
      this.selectedCity = null;
      this.unselectCity.emit();
      console.log('Unselect city');
    }
    this.cityIsSelected = false;
  }

  onSelectCity(city: City) {
    this.cityIsSelected = true;
    this.selectCity.emit(city);
    console.log('Select city');
  }

}
