import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/models/products/product';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { EditProductDialog } from './edit-product/edit-product-dialog';

@Component({
  selector: 'app-product-subpage',
  templateUrl: './product-subpage.component.html',
  styleUrls: ['./product-subpage.component.styl']
})
export class ProductSubpageComponent implements OnInit {

  productDataSource = new MatTableDataSource<Product>();
  displayedColumns = ['name', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService,
              private snack: MatSnackBar,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.paginator.pageSize = 10;
    this.updateProductsList();
    this.setPageUpdateEvent();
  }

  setPageUpdateEvent() {
    this.paginator.page.subscribe(
      success => {
        this.updateProductsList();
      }
    );
  }

  updateProductsList() {
    this.productService.getProducts(null, this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      products => {
        console.log('products', products);
        this.productDataSource.data = products.content;
        this.paginator.length = products.totalElements;
      }
    );
  }

  addProduct() {
    this.matDialog.open(EditProductDialog, { data: null }).afterClosed().subscribe(
      (result) => {
        if (result) {
          this.snack.open(`Успешно обновлено!`);
          this.updateProductsList();
        }
      },
      (error) => {
        alert('Ошибочка');
        console.error(error);
      }
    );
    this.snack.open(`Типо открытие панельки..`);
  }

  editProduct(product: Product) {
    this.matDialog.open(EditProductDialog, { data: product.id }).afterClosed().subscribe(
      (result) => {
        if (result) {
          this.snack.open(`Успешно обновлено!`);
          this.updateProductsList();
        }
      },
      (error) => {
        alert('Ошибочка');
        console.error(error);
      }
    );
    this.snack.open(`Типо открытие панельки..`);
  }

  deleteProduct(product: Product) {
    this.productService.removeProduct(product.id).subscribe(
      () => {
        this.snack.open(`Успешно удален продукт "${product.name}"!`);
        this.updateProductsList();
      },
      error => {
        this.snack.open('Не удалось удалить продукт!');
        console.log(error);
      }
    );
  }

}
