import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { SearchRequestSegment } from 'src/app/services/search/search-request-segment';
import { SearchService } from 'src/app/services/search/search.service';
import { Product } from 'src/models/products/product';
import { ProductType } from 'src/models/products/product-type';

import { ProductService } from './../../services/product/product.service';
import { PageableResponse } from 'src/models/system/pageable-response';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.styl']
})
export class PageProductsComponent implements OnInit {
  public productType: ProductType = null;
  public products$ = new Subject<Product[]>();

  private filters: SearchRequestSegment[];

  @ViewChild(MatPaginator)
  matPaginator: MatPaginator;

  constructor(private router: Router,
              private snack: MatSnackBar,
              private route: ActivatedRoute,
              private searchService: SearchService,
              private productService: ProductService,
              private productTypeService: ProductTypeService) {
  }

  ngOnInit() {
    // Validate argument.
    const productTypeId = this.route.snapshot.paramMap.get('productTypeId');
    if (!productTypeId) {
      this.redirectToMain();
      console.error('Была запрошена старница с товарами по пустой категории!');
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
        this.updateProductsList();
      },
      error => {
        console.error(error);
        this.snack.open('Не удалось загрузить тип продукта!');
      }
    );
  }


  updateProductsList() {
    let request: Observable<PageableResponse<Product>>;
    if (this.filters) {
      request = this.searchService.searchProductsByProperties(this.filters, this.matPaginator.pageIndex, this.matPaginator.pageSize);
    } else {
      request = this.productService.getProducts(this.productType.id, this.matPaginator.pageIndex, this.matPaginator.pageSize);
    }

    request.subscribe(
        (page) => {
          this.matPaginator.length = page.totalElements;
          this.products$.next(page.content);
        },
        (error) => {
          console.error('Не удалось получить товары по след. критериям:',
          {id: this.productType.id, currentPage: this.matPaginator.pageIndex, size: this.matPaginator.pageSize, error});
        }
      );
  }

  onApplyFilter(filters: SearchRequestSegment[]) {
    this.filters = filters;
    this.matPaginator.pageSize = 0;
    this.updateProductsList();
  }

  onCleanFilters() {
    this.filters = null;
    this.matPaginator.pageSize = 0;
    this.updateProductsList();
  }

  onChangePage() {
    this.updateProductsList();
  }
}
