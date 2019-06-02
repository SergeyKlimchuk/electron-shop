import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { City } from './../../../models/map/city';
import { MapService } from './../../services/map/map.service';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CityInputComponent, multi: true },
  ],
  styleUrls: ['./city-input.component.styl']
})
export class CityInputComponent implements OnInit, ControlValueAccessor {

  @Input()
  disabled: boolean;

  value: City;
  values: City[] = [];
  updateFn: (city: City) => void;

  initialValueWasProcessed = false;
  initialValue: City;

  constructor(private mapService: MapService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadValues();
  }

  loadValues() {
    this.mapService.getAllCities().subscribe(
      cities => {
        this.values = cities;
        if (this.initialValue) {
          this.selectValue(this.initialValue.id);
        }
        this.initialValueWasProcessed = true;
      },
      error => {
        this.notificationService.notifyAboutError('При получении городов произошла ошибка!', error);
      }
    );
  }

  selectValue(cityId: number) {
    this.value = this.values.filter(x => x.id === cityId)[0];
  }

  writeValue(city: City): void {
    if (this.initialValueWasProcessed) {
      this.selectValue(city.id);
    } else {
      this.initialValue = city;
    }
  }
  registerOnChange(fn: (city: City) => void): void {
    this.updateFn = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
