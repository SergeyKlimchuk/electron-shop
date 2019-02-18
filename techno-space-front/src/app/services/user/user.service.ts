import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private name: string;
  private lastName: string;
  private secondName: string;

  constructor() {
    this.name = 'Сергей';
    this.lastName = 'Климчук';
    this.secondName = 'Александрович';
  }

  /**
   * getUserName
   */
  public getUserName() {
    return this.name;
  }

  /**
   * getLastName
   */
  public getLastName() {
    return this.lastName;
  }

  /**
   * getFullName
   */
  public getFullName() {
    return `${this.name} ${this.lastName}`;
  }
}
