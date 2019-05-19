import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';

import { FavoritesService } from './../../services/favorites/favorites.service';

@Component({
  selector: 'app-favorites-button',
  templateUrl: './favorites-button.component.html',
  styleUrls: ['./favorites-button.component.styl']
})
export class FavoritesButtonComponent {

  private _productId: number;

  @Input()
  set productId(value: number) {
    this._productId = value;
    if (!value) {
      return;
    }
    this.userService.userIsAuthenticated().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.loadStatus();
        }
      }
    );
  }
  get productId() {
    return this._productId;
  }

  inFavorites = false;
  userIsAuthenticated = false;

  constructor(private userService: UserService,
              private favoritesService: FavoritesService,
              private snack: MatSnackBar) {
  }

  loadStatus() {
    this.favoritesService.checkInFavorites(this.productId).subscribe(
      result => this.inFavorites = result
    );
  }

  addToFavorite() {
    this.favoritesService.addProduct(this.productId).subscribe(
      () => this.inFavorites = true,
      error => {
        this.snack.open('При добавлении в избранное произошла ошибка!');
        console.error(error);
      }
    );
  }

  removeFromFavorite() {
    this.favoritesService.removeProduct(this.productId).subscribe(
      () => this.inFavorites = false,
      error => {
        this.snack.open('При удалении из избранного произошла ошибка!');
        console.error(error);
      }
    );
  }

}
