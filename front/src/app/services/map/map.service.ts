import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from 'src/models/map/city';
import { Country } from 'src/models/map/country';
import { Address } from 'src/models/map/address';
import { Place } from 'src/models/map/place';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<Country[]>('/api/map/countries');
  }

  getCitiesInCountry(countryId: number) {
    return this.http.get<City[]>(`/api/map/${countryId}`);
  }

  getAddressesInCity(cityId: number) {
    return this.http.get<Address[]>(`/api/city/${cityId}`);
  }

  findCityByName(name: string) {
    return this.http.get<City>(`/api/city?name=${name}`);
  }

  getUserLocation() {
    return this.http
      .get<Place>(`http://api.ipapi.com/check?access_key=${environment.ipapiToken}&format=1`);
  }
}
