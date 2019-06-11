import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Address } from 'src/models/map/address';
import { City } from 'src/models/map/city';
import { Country } from 'src/models/map/country';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }


  createCountry(country: Country) {
    return this.http.post<Country>('/api/map/countries', country).pipe(
      map(receivedCountry => this.setSingleProto(receivedCountry, Country))
    );
  }

  getCountries() {
    return this.http.get<Country[]>('/api/map/countries').pipe(
      map(countries => this.setProto(countries, Country))
    );
  }

  getCitiesInCountry(countryId: number) {
    return this.http.get<City[]>(`/api/map/countries/${countryId}/childrens`).pipe(
      map(cities => this.setProto(cities, City))
    );
  }

  deleteCountry(countryId: number) {
    return this.http.delete<void>(`/api/map/countries/${countryId}`);
  }

  getCountryOfCity(cityId: number) {
    return this.http.get<City>(`/api/map/cities/${cityId}/parent`).pipe(
      map(receivedCity => this.setSingleProto(receivedCity, City))
    );
  }


  getAllCities() {
    return this.http.get<City[]>(`/api/map/cities`).pipe(
      map(cities => this.setProto(cities, City))
    );
  }

  createCity(countryId: number, city: City) {
    return this.http.post<City>(`/api/map/countries/${countryId}/childrens`, city).pipe(
      map(receivedCity => this.setSingleProto(receivedCity, City))
    );
  }

  getCity(cityId: number) {
    return this.http.get<City>(`/api/map/cities/${cityId}`).pipe(
      map(city => this.setSingleProto(city, City))
    );
  }

  getMainCity() {
    return this.http.get<City>(`/api/map/cities/main`).pipe(
      map(city => this.setSingleProto(city, City))
    );
  }

  getAddressesInCity(cityId: number) {
    return this.http.get<Address[]>(`/api/map/cities/${cityId}/childrens`).pipe(
      map(addresses => this.setProto(addresses, Address))
    );
  }

  findCityByName(name: string) {
    return this.http.get<City>(`/api/map/cities/search?name=${name}`).pipe(
      map(city => this.setSingleProto(city, City))
    );
  }

  deleteCity(cityId: number) {
    return this.http.delete<void>(`/api/map/cities/${cityId}`);
  }


  createAddress(cityId: number, address: Address) {
    return this.http.post<Address>(`/api/map/cities/${cityId}/childrens`, address).pipe(
      map(receivedAddress => this.setSingleProto(receivedAddress, Address))
    );
  }

  getAddress(addressId: number) {
    return this.http.get<Address>(`/api/map/addresses/${addressId}`).pipe(
      map(address => this.setSingleProto(address, Address))
    );
  }

  deleteAddress(addressId: number) {
    return this.http.delete<void>(`/api/map/addresses/${addressId}`);
  }

  private setProto<T>(elements: T[], type: any): T[] {
    return elements.map(
      x => this.setSingleProto(x, type)
    );
  }

  private setSingleProto<T>(element: T, type: any): T {
    Object.setPrototypeOf(element, type.prototype);
    return element;
  }
}
