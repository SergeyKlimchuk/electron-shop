import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from 'src/models/map/address';
import { Country } from 'src/models/map/country';
import { MapState } from 'src/models/map/map-state';

import { City } from './../../../../models/map/city';
import { MapService } from './../../../services/map/map.service';
import { UserService } from './../../../services/user/user.service';

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
  selectPoint = new EventEmitter();

  countries: Country[] = [];
  selectedCountry: Country = null;

  selectedCity: City = null;
  cities: City[] = [];

  selectedAddress: Address = null;
  addresses: Address[] = [];

  constructor(private mapService: MapService,
              private userService: UserService) {
    this.mapService.getCountries().subscribe(
      countries => this.countries = countries
    );
  }

  ngOnInit() {
    this.selectUserCity();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeCountry(country: Country) {
    console.log('Change country to ', country);

    this.selectedCountry = country;
    this.selectedCity = null;
    this.selectedAddress = null;
    if (country) {
      this.mapService.getCitiesInCountry(country.id).subscribe(
        cities => {
          this.cities = cities;
          this.selectPoint.emit({
            targetPoint: this.selectedCountry,
            markers: cities,
            zoom: 0
          });
        }
      );
    } else {
      this.countries = [];
    }
  }

  onChangeCity(city: City) {
    console.log('Change city to ', city);
    this.selectedCity = city;
    if (city !== null) {
      this.mapService.getAddressesInCity(city.id).subscribe(
        addresses => {
          this.addresses = addresses;
          this.selectPoint.emit({
            targetPoint: this.selectedCity,
            markers: addresses,
            zoom: 0
          });
        }
      );
    } else {
      this.selectPoint.emit({
        targetPoint: this.selectedCountry,
        markers: this.cities,
        zoom: 0
      });
    }
  }

  onSelectAddress(address: Address) {
    console.log('Change address to ', address);
    this.selectedAddress = address;
    if (address !== null) {
      this.selectPoint.emit({
        targetPoint: address,
        markers: [],
        zoom: 0
      });
    } else {
      this.selectPoint.emit({
        targetPoint: this.selectedCity,
        markers: this.addresses,
        zoom: 0
      });
    }
  }

  selectUserCity() {
    this.userService.userIsAuthenticated().subscribe(
      isAuthenticated => {
        console.log('User is not authenticated');

        if (isAuthenticated) {
          this.loadUserCity();
        } else {
          this.FindUserCity();
        }
      }
    );
  }

  selectCity(cityId: number) {
    this.mapService.getCountryOfCity(cityId).subscribe(
      country => {
        this.selectedCountry = this.countries.filter(x => x.id === country.id)[0];
        this.mapService.getCitiesInCountry(this.selectedCountry.id).subscribe(
          cities => {
            this.cities = cities;
            this.onChangeCity(this.cities.filter(x => x.id === cityId)[0]);
          }
        );
      }
    );
  }

  loadUserCity() {
    this.userService
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user.city) {
          this.selectCity(user.city.id);
        } else {
          this.FindUserCity();
        }
      });
  }

  FindUserCity() {
    this.userService
      .getUserCity()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        city => this.selectCity(city.id),
        error => {
          if (error.status === 404) {
            this.mapService.getMainCity()
              .subscribe(city => this.selectCity(city.id));
          } else {
            this.selectPoint.error(null);
          }
        }
      );
  }

  selectWorld() {
    this.mapService.getCountries().subscribe(countries => {
      this.selectPoint.emit({
        targetPoint: {latitude: 50, longitude: 50},
        markers: countries,
        zoom: 0
      });
    });
  }

}
