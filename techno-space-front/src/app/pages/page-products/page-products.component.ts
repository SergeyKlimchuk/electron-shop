import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { Product } from 'src/models/products/product';
import { ProductInfoTitle } from 'src/models/products/product-info-title';
import { ProductPropertyTitleType } from 'src/models/products/product-property-title-type';
import { ProductType } from 'src/models/products/product-type';

import { ProductInfoTitleService } from './../../services/product-info-title/product-info-title.service';
import { ProductService } from './../../services/product/product.service';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.styl']
})
export class PageProductsComponent implements OnInit {
  public productType: ProductType = null;
  public products$ = new Subject<Product[]>();
  public pageButtons = new Subject<number[]>();
  public filtrableProperies: ProductInfoTitle[];

  totalPages = 1;
  totalProducts = 0;
  size = 6;
  currentPage = 0;

  priorPageIsAlloved = false;
  nextPageIsAlloved = false;

  pagesCountOption = [ 10, 20, 30, 40 ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private productInfoTitleService: ProductInfoTitleService,
              private snack: MatSnackBar,
              private productTypeService: ProductTypeService) {
  }

  ngOnInit() {
    // Validate argument.
    const productTypeId = this.route.snapshot.paramMap.get('productTypeId');
    if (!productTypeId) {
      this.redirectToMain();
      console.error('Была запрошена старница с товарами по пустой категории');
      return;
    }
    this.loadProductType(Number(productTypeId));
  }

  redirectToMain() {
    this.router.navigate(['/main']);
  }

  loadProductType(productTypeId: number) {
    this.productTypeService.getProductType(productTypeId).subscribe(
      productType => {
        this.productType = productType;
        this.loadFilters();
        this.updateProductsList();
      },
      error => {
        console.error(error);
        this.snack.open('Не удалось загрузить тип продукта!');
      }
    );
  }

  loadFilters() {
    this.productInfoTitleService.getProductInfoTitles(this.productType.id).subscribe(
      (productInfoTitles) => {
        this.filtrableProperies = productInfoTitles
          .filter(title => title.type === ProductPropertyTitleType.Dictionary);
      }
    );
  }

  updateProductsList() {
    this.productService
      .getProducts(this.productType.id, this.currentPage, this.size).subscribe(
        (page) => {
          const pagesCount = page.totalPages;
          this.totalPages = pagesCount;
          this.totalProducts = page.totalElements;
          this.updatePageButtons(pagesCount);
          this.updateButtonsState();
          this.products$.next(page.content);
        },
        (error) => {
          console.error('Не удалось получить товары по след. критериям:',
          {id: this.productType.id, currentPage: this.currentPage, size: this.size, error});
        }
      );
  }

  updatePageButtons(pageButtonsCount: number) {
    const numbersArray = Array(pageButtonsCount).map( (x, i) => i);
    this.pageButtons.next(numbersArray);
  }

  updateButtonsState() {
    const currentPageIsNotFirst = this.currentPage !== 0;
    this.priorPageIsAlloved = currentPageIsNotFirst;
    const currentPageIsNotLast = this.currentPage !== this.totalPages - 1;
    this.nextPageIsAlloved = currentPageIsNotLast;
  }

  changeItemsPageSize(newSize: number) {
    this.size = newSize;
    this.updateProductsList();
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.updateProductsList();
  }

  nextPage() {
    if (this.nextPageIsAlloved) {
      this.currentPage++;
      this.updateProductsList();
    }
  }

  priorPage() {
    if (this.priorPageIsAlloved) {
      this.currentPage--;
      this.updateProductsList();
    }
  }
}
