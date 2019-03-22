import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './../../../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
    this.updateUser().subscribe(
      () => {
        console.log('Пользователь был успешно авторизован!');
      },
      error => {}
    );
  }

  getRequiredPasswordLength() {
    return 6;
  }

  updateUser() {
    return this.http.get<User>('/api/user/current').pipe(
      tap(user => this.user$.next(user))
    );
  }

  getCurrentUserValue(): User {
    return this.user$.getValue();
  }

  getCurrentUser(): Observable<User> {
    return this.user$;
  }

  registration(user: User) {
    if (this.user$.getValue()) {
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
        this.updateUser().toPromise();
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
