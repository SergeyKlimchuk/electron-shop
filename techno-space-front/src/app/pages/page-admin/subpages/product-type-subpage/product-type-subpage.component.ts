import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ProductTypeService } from 'src/app/services/product-type/product-type.service';
import { ProductType } from 'src/models/products/product-type';
import { EditProductTypeDialog } from './edit-product-type/edit-product-type-dialog';

@Component({
  selector: 'app-product-type-subpage',
  templateUrl: './product-type-subpage.component.html',
  styleUrls: ['./product-type-subpage.component.styl']
})
export class ProductTypeSubpageComponent implements OnInit {

  dataSource = new MatTableDataSource<ProductType>();
  selectedProductType: ProductType;
  displayedColumns = ['name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productTypeService: ProductTypeService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.paginator.pageSize = 2;
    this.upadtePage();
    this.setPageUpdateEvent();
  }

  // TODO: Проверить на пустой БД
  upadtePage() {
    console.log('Обновлена страница');
    this.productTypeService.getProductTypes(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      (productTypesPageable) => {
        // TODO: Add algorithm for fix case (Load this page, update db, press next page)
        this.paginator.length = productTypesPageable.totalElements;
        this.dataSource.data = productTypesPageable.content;
      },
      (error) => {
        alert('Error!');
        console.error(error);
      }
    );
  }

  setPageUpdateEvent() {
    this.paginator.page.subscribe(
      (success) => {
        console.log('Update values: ', success);
        this.upadtePage();
      }
    );
  }

  rowClick(productType: ProductType) {
    this.matDialog.open(EditProductTypeDialog, {
      data: productType
    }).afterClosed().subscribe(
      (result) => {
        if (result) {
          alert('Успешно сохранил!');
          this.upadtePage();
        }
      },
      (error) => {
        alert('Ошибочка');
        console.error(error);
      }
    )
  }

}
