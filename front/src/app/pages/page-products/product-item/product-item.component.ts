import { CartService } from './../../../services/cart/cart.service';
import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/products/product';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';
import { filter, tap, flatMap } from 'rxjs/operators';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { Observable } from 'rxjs';
import { User } from 'src/models/users/user';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.styl']
})
export class ProductItemComponent implements OnInit {

  constructor(private productService: ProductService,
              private userService: UserService,
              private cartService: CartService,
              private favoritesService: FavoritesService,
              private snack: MatSnackBar) { }

  @Input()
  productId: number;

  product: Product;
  userIsAuthenticated = false;
  inCart = false;
  inFavorites = false;

  ngOnInit() {
    this.loadProduct();
    const user$ = this.userService.getCurrentUser().pipe(
      tap(x => this.userIsAuthenticated = !!x),
      filter(x => !!x),
    );

    this.subscrubeOnUserFavorites(user$);
    this.subscrubeOnUserCart(user$);
  }

  subscrubeOnUserFavorites(user$: Observable<User>) {
    user$.pipe(flatMap(() => this.favoritesService.getProducts())).subscribe(
      products => {
        this.inFavorites = products.some(x => x.id === this.productId);
      },
      error => {
        console.error('Ошибка при получении списка избранных товаров!', error);
      }
    );
  }

  subscrubeOnUserCart(user$: Observable<User>) {
    user$.pipe(flatMap(() => this.cartService.getProducts())).subscribe(
      products => {
        this.inCart = products.some(x => x.id === this.productId);
      },
      error => {
        console.error('Ошибка при получении товаров в корзине!', error);
      }
    );
  }

  loadProduct() {
    this.productService.getProduct(this.productId).subscribe(
      product => this.product = product,
      error => {
        this.snack.open('При получении информации по продукту произошла ошибка!');
        console.error(error);
      }
    );
  }




}
