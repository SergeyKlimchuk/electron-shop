import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/models/products/product';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-page-favorites',
  templateUrl: './page-favorites.component.html',
  styleUrls: ['./page-favorites.component.styl']
})
export class PageFavoritesComponent implements OnInit {

  products$ = new Subject<Product[]>();

  constructor(private favoritesService: FavoritesService,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.favoritesService.getProducts().subscribe(
      products => this.products$.next(products),
      error => {
        const message = 'При запросе продуктов из избранного произошла ошибка!';
        console.error(message, error);
        this.snack.open(message);
      }
    );
  }

}
