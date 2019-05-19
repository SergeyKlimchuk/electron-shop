import { Subject, BehaviorSubject } from 'rxjs';
import { UserService } from './../../../services/user/user.service';
import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { Address } from 'src/models/map/address';
import { Country } from 'src/models/map/country';
import { MapState } from 'src/models/map/map-state';

import { City } from './../../../../models/map/city';
import { MapService } from './../../../services/map/map.service';
import { MapZoom } from 'src/models/map/map-zoom';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-point-selector',
  templateUrl: './point-selector.component.html',
  styleUrls: ['./point-selector.component.styl']
})
export class PointSelectorComponent implements OnInit, OnDestroy {

  readonly zoomForWorld = 0;
  readonly zoomForCountry = 7;
  readonly zoomForCity = 13;
  readonly zoomForShop = 17;
  unsubscribe$ = new Subject();

  @Output()
  selectPoint = new EventEmitter<MapState>();

  countries$ = new BehaviorSubject<Country[]>([]);
  selectedCountry: Country = null;
  selectedCity: City = null;
  selectedAddress: Address = null;

  constructor(private mapService: MapService,
              private userService: UserService) {
    this.mapService.getCountries().subscribe(
      countries => this.countries$.next(countries)
    );
  }

  onChangeCountry() {
    console.log('onChangeCountry');
    this.selectedCity = null;
    this.selectedAddress = null;
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

  setCityInAddressLine(city: City) {
    if (!city) {
      this.selectedCity = null;
      this.selectedAddress = null;
    }
    const countries = this.countries$.getValue();
    for (const country of countries) {
      const cityIndex = country.cities.findIndex( (x, i) => x.id === city.id);
      if (cityIndex !== -1) {
        console.log('City was founded!');
        this.selectedCountry = country;
        this.selectedCity = country.cities[cityIndex];
        break;
      }
    }
  }




  ngOnInit() {
    this.selectUserCity();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectUserCity() {
    this.userService.userIsAuthenticated().subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.loadUserCity();
        } else {
          this.FindUserCity();
        }
      }
    );
  }

  loadUserCity() {
    this.userService
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.selectPoint.emit({
          targetPoint: user.city,
          markers: user.city.addresses,
          zoom: MapZoom.CITY
        });
        this.setCityInAddressLine(user.city);
      });
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
        city => this.selectCity(city),
        error => {
          if (error.status === 404) {
            this.mapService.getMainCity()
              .subscribe(city => this.selectCity(city));
          } else {
            this.selectPoint.error(null);
          }
        }
      );
  }

  selectCity(city: City) {
    if (city) {
      this.selectPoint.emit({
        targetPoint: city,
        markers: city.addresses,
        zoom: MapZoom.CITY
      });
    } else {
      this.selectWorld();
    }
    this.setCityInAddressLine(city);
  }

  selectWorld() {
    this.mapService.getCountries().subscribe(countries => {
      this.selectPoint.emit({
        targetPoint: {latitude: 50, longitude: 50},
        markers: countries,
        zoom: MapZoom.CITY
      });
    });
  }


}
