import { environment } from 'src/environments/environment';
import { Place } from './../../../models/map/place';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, tap, switchMap } from 'rxjs/operators';

import { User } from './../../../models/users/user';
import { MapService } from './../map/map.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private mapService: MapService) {
  }

  getRequiredPasswordLength() {
    return 6;
  }

  userIsAuthenticated() {
    return new Observable<boolean>(observer => {
      this.getCurrentUser().subscribe(
        currentUser => {
          observer.next(!!currentUser);
        },
        _ => {
          observer.next(false);
        }
      );
    });
  }

  private getUserLocation() {
    console.log('GET LOCATION...');

    return this.http
    .get<Place>(`http://api.ipapi.com/check?access_key=${environment.ipapiToken}&format=1`);
  }

  getUserCity() {
    return this.getUserLocation()
      .pipe(
        switchMap(place =>
          this.mapService.findCityByName(place.location.capital)
        )
      );
  }

  updateEmail(newEmail: string, password: string) {
    return this.http.post<User>('/api/user/current/email', {newEmail, password});
  }

  updateSecondaryEmail(newEmail: string, password: string) {
    return this.http.post<User>('/api/user/current/secondaryEmail', {newEmail, password});
  }

  updatePassword(newPassword: string, currentPassword: string) {
    return this.http.post<User>('/api/user/current/password', {newPassword, currentPassword});
  }

  updateUser(name: string, lastName: string, secondName: string, phoneNumber: string) {
    return this.http.put<User>('/api/user/current', {name, lastName, secondName, phoneNumber});
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user/current');
  }

  registration(user: User) {
    return this.userIsAuthenticated().pipe(
      flatMap(isAuthenticated => {
        if (isAuthenticated) {
          throw new Error('User is already atuhenticated!');
        }
        return this.http.post<User>('/api/registration', user);
      })
    );
  }

  signIn(email: string, password: string) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    this.http.post<any>('/api/login', formData).pipe(
      tap(user => {
        window.location.reload();
      })
    ).subscribe();
  }

  signOut() {
    return this.http.get<void>('/api/logout');
  }
}
