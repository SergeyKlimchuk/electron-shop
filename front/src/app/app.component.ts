import { ProductTypeService } from './services/product-type/product-type.service';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'techno-space';

  categories$ = this.productTypeService.getProductTypes().pipe(map(x => x.content.slice(0, 12)));

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private productTypeService: ProductTypeService) {
    this.linkImages();
  }

  linkImages() {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/google.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `vk`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/vk.svg`)
    );
  }
}
