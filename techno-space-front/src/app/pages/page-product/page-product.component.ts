import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/models/products/product';
import { ProductProperty } from 'src/models/products/product-property';
import { ProductInfoValueService } from 'src/app/services/product-info-value/product-info-value.service';
import { ProductInfoTitleService } from 'src/app/services/product-info-title/product-info-title.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.styl']
})
export class PageProductComponent implements OnInit {

  product: Product = new Product();
  displayedColumns = ['name', 'value'];
  properties: ProductProperty[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private productInfoValueService: ProductInfoValueService,
              private productInfoTitleService: ProductInfoTitleService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.productService.getProduct(Number(productId)).subscribe(
      (product) => {
        this.product = product;
        this.applyproductProperties();
      },
      (error) => {
        console.error(error);
        //this.redirectToMain();
      }
    );
  }

  redirectToMain() {
    this.router.navigate(['/main']);
  }

  async applyproductProperties() {
    this.productService.getProductProperties(this.product.id).subscribe(
      (properties) => {
        this.properties = new Array<ProductProperty>();
        this.properties = properties;
      },
      (error) => {
        console.error('Не удалось получить свойства товара!', error);
      }
    );
  }

}
