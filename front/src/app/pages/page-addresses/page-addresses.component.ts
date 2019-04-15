import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Country } from 'src/models/map/country';
import { Point } from 'src/models/map/point';

import { Address } from './../../../models/map/address';
import { City } from './../../../models/map/city';
import { MapService } from './../../services/map/map.service';
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-page-addresses',
  templateUrl: './page-addresses.component.html',
  styleUrls: ['./page-addresses.component.styl']
})
export class PageAddressesComponent implements OnInit, OnDestroy {
  readonly zoomForWorld = 0;
  readonly zoomForCountry = 7;
  readonly zoomForCity = 13;
  readonly zoomForShop = 17;

  readonly labelForCountries = 'Список стран';
  readonly labelForCities = 'Список кородов';
  readonly labelForAddresses = 'Адреса магазинов';

  countries$ = new BehaviorSubject<Country[]>([]); // TODO: add btns
  cities$ = new BehaviorSubject<City[]>([]);
  addresses$ = new BehaviorSubject<Address[]>([]);
  unsubscribe$ = new Subject();

  label: string;

  currentPoint: Point;
  markers$ = new BehaviorSubject<Point[]>([]);
  currentZoom = this.zoomForCity;

  error = false;

  constructor(
    private mapService: MapService,
    private userService: UserService
  ) {}

  icon = {
    url: 'http://localhost:4200/assets/icons/mark_icon.svg',
    scaledSize: {
      width: 48,
      height: 48
    }
  };

  ngOnInit() {
    this.selectUserCity();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadUserCity() {
    this.userService
      .getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(user => this.showCity(user.city))
      )
      .subscribe();
  }

  selectUserCity() {
    if (this.userService.userIsAuthenticated()) {
      this.loadUserCity();
    } else {
      this.FindUserCity();
    }
  }

  FindUserCity() {
    this.mapService
      .getUserLocation()
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(place =>
          this.mapService.findCityByName(place.location.capital)
        )
      )
      .subscribe(
        city => {
          if (city) {
            this.showCity(city);
          } else {
            this.showWorld();
          }
        },
        error => {
          this.error = true;
        }
      );
  }

  showWorld() {
    this.label = this.labelForCountries;
    this.mapService.getCountries().subscribe(countries => {
      this.currentZoom = this.zoomForWorld;
      this.markers$.next(countries);
      this.currentPoint = { latitude: 50, longitude: 50 };
    });
  }

  showCountry(country: Country) {
    console.log('select country', country);
    this.label = this.labelForCities;
    this.currentZoom = this.zoomForCountry;
    this.currentPoint = country;
    this.markers$.next(country.cities);
  }

  showCity(city: City) {
    console.log('select city', city);
    this.label = this.labelForAddresses;
    this.currentZoom = this.zoomForCity;
    this.currentPoint = city;
    this.markers$.next(city.addresses);
  }

  showAddress(address: Address) {
    console.log('select address', address);
    this.label = this.labelForAddresses;
    this.currentZoom = this.zoomForShop;
    this.currentPoint = address;
  }
}
