import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { IdentitySelectionModel } from 'src/app/services/identity-selection-model/identity-selection-model.service';
import { Product } from 'src/models/products/product';

import { ProductService } from './../../services/product/product.service';


@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.styl']
})
export class ProductSelectDialog {

  isMultiply = true;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  dataSource = new MatTableDataSource<Product>([]);

  selectedProducts = new IdentitySelectionModel<Product>();

  currentPage = 0;

  constructor(public dialogRef: MatDialogRef<ProductSelectDialog>,
              @Inject(MAT_DIALOG_DATA) public products: Product[],
              private productService: ProductService) {
    this.selectedProducts.selected = products;
    this.loadPage(this.currentPage);
  }

  loadPage(page: number) {
    this.productService.getProducts(null, page, 5, 'name,desc').subscribe(
      products => {
        this.dataSource.data = products.content;
        this.paginator.pageIndex = products.pageable.pageNumber;
        this.paginator.pageSize = 5;
        this.paginator.length = products.totalElements;
      }
    );
  }

  save() {
    this.dialogRef.close(this.selectedProducts.selected);
  }

}
