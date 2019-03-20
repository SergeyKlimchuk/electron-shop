import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './../../../models/users/user';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private user = new Subject<User>();
  private userAuthenticated = false;

  constructor(private http: HttpClient) {
    this.updateUser();
  }

  ngOnInit(): void {

  }

  getRequiredPasswordLength() {
    return 6;
  }

  updateUser(): void {
    this.http.get<User>('/api/user/current').subscribe(
      (success) => {
        this.user.next(success);
        this.userAuthenticated = true;
        console.log('Пользователь авторизован');
      },
      (error) => {
        console.log('Пользователь не авторизован');
      }
    );
  }

  userIsAuthenticated(): boolean {
    return this.userAuthenticated;
  }

  getCurrentUser(): Observable<User> {
    return this.user;
  }

  registration(user: User) {
    if (this.userAuthenticated) {
      return;
    }
    return this.http.post<User>('/api/registration', user);
  }

  signIn(email: string, password: string): Observable<any> {
    console.log(email, password);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const loginRequest = this.http.post<any>('/api/login', formData);
    loginRequest.subscribe(
      (success) => {
        this.updateUser();
        console.log('Пользователь успешно авторизовался!');
      },
      (error) => {
        console.log('Пользователь не смог авторизоваться!');
      }
    );
    return loginRequest;
  }
}
