import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MapState } from 'src/models/map/map-state';
import { MapZoom } from 'src/models/map/map-zoom';

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
  label: string;

  state: MapState;

  error = false;
  unsubscribe$ = new Subject();

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

  selectUserCity() {
    if (this.userService.userIsAuthenticated()) {
      this.loadUserCity();
    } else {
      this.FindUserCity();
    }
  }

  loadUserCity() {
    this.userService
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.state = {
          targetPoint: user.city,
          markers: user.city.addresses,
          zoom: MapZoom.CITY
        };
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
        city => {
          if (city) {
            this.state = {
              targetPoint: city,
              markers: city.addresses,
              zoom: MapZoom.CITY
            };
          } else {
            this.selectWorld();
          }
        },
        error => {
          this.error = true;
        }
      );
  }

  selectWorld() {
    this.mapService.getCountries().subscribe(countries => {
      this.state = {
        targetPoint: {latitude: 50, longitude: 50},
        markers: countries,
        zoom: MapZoom.CITY
      };
    });
  }

  showPointWithMarkers(newState: MapState) {
    console.log('LOG:', newState);
    this.state = newState;
  }
}
