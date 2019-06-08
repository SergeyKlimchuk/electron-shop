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

  constructor(private http: HttpClient) { }


  createCountry(country: Country) {
    return this.http.post<Country>('/api/map/countries', country);
  }

  getCountries() {
    return this.http.get<Country[]>('/api/map/countries');
  }

  getCitiesInCountry(countryId: number) {
    return this.http.get<City[]>(`/api/map/countries/${countryId}/cities`);
  }

  deleteCountry(countryId: number) {
    return this.http.delete<void>(`/api/map/countries/${countryId}`);
  }

  getCountryOfCity(cityId: number) {
    return this.http.get<City>(`/api/map/cities/${cityId}/country`);
  }


  getAllCities() {
    return this.http.get<City[]>(`/api/map/cities`);
  }

  createCity(countryId: number, city: City) {
    return this.http.post<City>(`/api/map/countries/${countryId}/cities`, city);
  }

  getCity(cityId: number) {
    return this.http.get<City>(`/api/map/countries/${cityId}/cities`);
  }

  getMainCity() {
    return this.http.get<City>(`/api/map/cities/main`);
  }

  getAddressesInCity(cityId: number) {
    return this.http.get<Address[]>(`/api/map/cities/${cityId}/addresses`);
  }

  findCityByName(name: string) {
    return this.http.get<City>(`/api/map/cities/search?name=${name}`);
  }

  deleteCity(cityId: number) {
    return this.http.delete<void>(`/api/map/cities/${cityId}`);
  }


  createAddress(cityId: number, address: Address) {
    return this.http.post<Address>(`/api/map/cities/${cityId}/addresses`, address);
  }

  getAddress(addressId: number) {
    return this.http.get<Address>(`/api/map/addresses/${addressId}`);
  }

  deleteAddress(addressId: number) {
    return this.http.delete<void>(`/api/map/addresses/${addressId}`);
  }
}
