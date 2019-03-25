import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { SearchDropdownComponent } from './header/search/search-dropdown/search-dropdown.component';
import { SliderComponent } from './core/slider/slider.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageActionsComponent } from './pages/page-actions/page-actions.component';
import { PageAddressesComponent } from './pages/page-addresses/page-addresses.component';
import { BestCategoriesComponent } from './pages/page-main/best-categories/best-categories.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegistrationComponent } from './pages/page-registration/page-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { PageProductGroupComponent } from './pages/page-product-group/page-product-group.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { ProductTypeSubpageComponent } from './pages/page-admin/subpages/product-type-subpage/product-type-subpage.component';
import { ProductSubpageComponent } from './pages/page-admin/subpages/product-subpage/product-subpage.component';
import { DictionariesSubpageComponent } from './pages/page-admin/subpages/dictionaries-subpage/dictionaries-subpage.component';
import { EditProductTypeDialog } from './pages/page-admin/subpages/product-type-subpage/edit-product-type/edit-product-type-dialog';
import { DictionaryValuesListComponent } from './pages/page-admin/subpages/dictionaries-subpage/dictionary-values-list/dictionary-values-list.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { EditProductDialog } from './pages/page-admin/subpages/product-subpage/edit-product/edit-product-dialog';
import { LoadableImageComponent } from './core/loadable-image/loadable-image.component';
import { DictionaryValueInputComponent } from './core/dictionary-value-input/dictionary-value-input.component';
import { ProductTypeInputComponent } from './core/product-type-input/product-type-input.component';
import { ProductTypeFilterComponent } from './core/product-type-filter/product-type-filter.component';
import { ProductPropertyValueEditorComponent } from './core/product-property-value-editor/product-property-value-editor.component';
import { ProductItemComponent } from './pages/page-products/product-item/product-item.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { NumberSplitPipe } from './core/pipes/number-split.pipe';
import { PageFavoritesComponent } from './pages/page-favorites/page-favorites.component';


const appRoutes: Routes = [
  { path: 'main',           component: PageMainComponent              },
  { path: 'login',          component: PageLoginComponent             },
  { path: 'registration',   component: PageRegistrationComponent      },
  { path: 'product-types',  component: PageProductGroupComponent      },
  { path: 'products',       component: PageProductsComponent          },
  { path: 'products/:productTypeId', component: PageProductsComponent },
  { path: 'product/:productId',    component: PageProductComponent    },
  { path: 'addresses',      component: PageAddressesComponent         },
  { path: 'actions',        component: PageActionsComponent           },
  { path: 'actions/:id',    component: PageActionsComponent           },
  { path: 'admin-panel',    component: PageAdminComponent             },
  { path: 'cart',           component: PageCartComponent              },
  { path: 'favorites',      component: PageFavoritesComponent         },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: '**',          component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchDropdownComponent,
    SliderComponent,
    PageNotFoundComponent,
    PageMainComponent,
    PageProductComponent,
    PageActionsComponent,
    PageAddressesComponent,
    BestCategoriesComponent,
    PageLoginComponent,
    PageRegistrationComponent,
    PageProfileComponent,
    PageProductsComponent,
    PageProductGroupComponent,
    PageAdminComponent,
    ProductTypeSubpageComponent,
    ProductSubpageComponent,
    DictionariesSubpageComponent,
    EditProductTypeDialog,
    DictionaryValuesListComponent,
    EditProductDialog,
    LoadableImageComponent,
    DictionaryValueInputComponent,
    ProductTypeInputComponent,
    ProductTypeFilterComponent,
    ProductPropertyValueEditorComponent,
    ProductItemComponent,
    PageCartComponent,
    NumberSplitPipe,
    PageFavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MaterialModule
    // other imports here
  ],
  entryComponents: [
    EditProductTypeDialog,
    EditProductDialog
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }