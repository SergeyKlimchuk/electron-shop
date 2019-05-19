import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Product } from 'src/models/products/product';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-page-favorites',
  templateUrl: './page-favorites.component.html',
  styleUrls: ['./page-favorites.component.styl']
})
export class PageFavoritesComponent implements OnInit, OnDestroy {

  products$ = new Subject<Product[]>();
  subscribtion: Subscription;

  constructor(private favoritesService: FavoritesService,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.subscribtion = this.favoritesService.getProducts().subscribe(
      products => this.products$.next(products),
      error => {
        const message = 'При запросе продуктов из избранного произошла ошибка!';
        console.error(message, error);
        this.snack.open(message);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }

}
