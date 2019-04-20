import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './../../../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new BehaviorSubject<User>(null);
  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    this.loadUser().subscribe(
      () => {
        console.log('Пользователь был успешно авторизован!');
      },
      error => this.isAuthenticated = false
    );
    this.user$.subscribe(user => this.isAuthenticated = !!user);
  }

  getRequiredPasswordLength() {
    return 6;
  }

  loadUser() {
    return this.http.get<User>('/api/user/current').pipe(
      tap(user => this.user$.next(user))
    );
  }

  userIsAuthenticated() {
    return this.isAuthenticated;
  }

  updateEmail(newEmail: string, password: string) {
    return this.http.post<User>('/api/user/current/email', {newEmail, password}).pipe(
      tap(user => this.user$.next(user))
    );
  }

  updateSecondaryEmail(newEmail: string, password: string) {
    return this.http.post<User>('/api/user/current/secondaryEmail', {newEmail, password}).pipe(
      tap(user => this.user$.next(user))
    );
  }

  updatePassword(newPassword: string, currentPassword: string) {
    return this.http.post<User>('/api/user/current/password', {newPassword, currentPassword}).pipe(
      tap(user => this.user$.next(user))
    );
  }

  updateUser(name: string, lastName: string, secondName: string, phoneNumber: string) {
    return this.http.put<User>('/api/user/current', {name, lastName, secondName, phoneNumber}).pipe(
      tap(user => this.user$.next(user))
    );
  }

  getCurrentUser(): Observable<User> {
    return this.user$;
  }

  registration(user: User) {
    if (this.isAuthenticated) {
      return;
    }
    return this.http.post<User>('/api/registration', user);
  }

  signIn(email: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const loginRequest = this.http.post<any>('/api/login', formData);
    loginRequest.subscribe(
      () => {
        this.loadUser().toPromise();
        console.log('Пользователь успешно авторизовался!');
      },
      (error) => {
        console.log('Пользователь не смог авторизоваться!', error);
      }
    );
    return loginRequest;
  }

  signOut() {
    return this.http.get<void>('/api/logout');
  }
}
