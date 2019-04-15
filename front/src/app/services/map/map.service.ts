import { UserService } from './../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/models/map/address';
import { City } from 'src/models/map/city';
import { Country } from 'src/models/map/country';
import { Place } from 'src/models/map/place';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getCountries() {
    return this.http.get<Country[]>('/api/map/countries');
  }

  getCitiesInCountry(countryId: number) {
    return this.http.get<City[]>(`/api/map/${countryId}`);
  }

  getAddressesInCity(cityId: number) {
    return this.http.get<Address[]>(`/api/map/city/${cityId}`);
  }

  findCityByName(name: string) {
    console.log('name', name);

    return this.http.get<City>(`/api/map/city?name=${name}`);
  }

  getUserLocation() {
    console.log('GET LOCATION...');

    return this.http
    .get<Place>(`http://api.ipapi.com/check?access_key=${environment.ipapiToken}&format=1`);
  }
}
