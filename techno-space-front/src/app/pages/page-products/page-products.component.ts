import { ProductService } from './../../services/product/product.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/models/products/product';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { ProductType } from 'src/models/products/product-type';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.styl']
})
export class PageProductsComponent implements OnInit {
  public productType: ProductType = null;
  public products = new Subject<Product[]>();
  public pageButtons = new Subject<number[]>();
  public productTypeName = '';

  totalPages = 1;
  totalProducts = 0;
  size = 6;
  currentPage = 0;

  priorPageIsAlloved = false;
  nextPageIsAlloved = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private productTypeService: ProductTypeService) {
  }

  ngOnInit() {
    // Validate argument.
    const productTypeId = this.route.snapshot.paramMap.get('productTypeId');
    if (productTypeId == null) {
      this.redirectToMain();
      console.log('Была запрошена старница с товарами по пустой категории', productTypeId);
      return;
    }
    console.log('Пользователь зашел на страницу просомтра продуктов по типу', productTypeId);
    const idAsNumber = Number(productTypeId);
    // Get productType from DB and update list for him.
    this.applyProductType(idAsNumber).subscribe(
      (productType) => {
        this.productTypeName = productType.name;
        this.updateProductsList();
      },
      (error) => {
        console.error('Не удалось получить тип продукта по его идентификатору!', error);
      }
    );
  }

  redirectToMain() {
    this.router.navigate(['/main']);
  }

  applyProductType(productTypeId: number) {
    return this.productTypeService.getProductType(productTypeId).pipe(
      tap(productType => {
        this.productType = productType;
      })
    );
  }

  updateProductsList() {
    this.productService
      .getProducts(this.productType.id, this.currentPage, this.size).subscribe(
        (page) => {
          console.log('page', page);
          const pagesCount = page.totalPages;
          this.totalPages = pagesCount;
          this.totalProducts = page.totalElements;
          this.updatePageButtons(pagesCount);
          this.updateButtonsState();
          this.products.next(page.content);
          console.log('Обновлен список продуктов.');
        },
        (error) => {
          console.error('Не удалось получить товары по след. критериям:',
          {id: this.productType.id, currentPage: this.currentPage, size: this.size, error});
        }
      );
  }

  updatePageButtons(pageButtonsCount: number) {
    const numbersArray = Array(pageButtonsCount).map( (x, i) => i);
    console.log(pageButtonsCount);
    this.pageButtons.next(numbersArray);
  }

  updateButtonsState() {
    const currentPageIsNotFirst = this.currentPage !== 0;
    this.priorPageIsAlloved = currentPageIsNotFirst;
    const currentPageIsNotLast = this.currentPage !== this.totalPages - 1;
    this.nextPageIsAlloved = currentPageIsNotLast;
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
