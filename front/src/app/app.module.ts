import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeEmailDialog } from './core/dialogs/change-email/change-email-dialog';
import { ChangePasswordDialog } from './core/dialogs/change-password/change-password-dialog';
import { ChangeSecondaryEmailDialog } from './core/dialogs/change-secondary-email/change-secondary-email-dialog';
import { DictionaryValueInputComponent } from './core/dictionary-value-input/dictionary-value-input.component';
import { HistoryListComponent } from './core/history-list/history-list.component';
import { LoadableImageComponent } from './core/loadable-image/loadable-image.component';
import { NotificationsListComponent } from './core/notifications-list/notifications-list.component';
import { NumberSplitPipe } from './core/pipes/number-split.pipe';
import {
  ProductPropertyValueEditorComponent,
} from './core/product-property-value-editor/product-property-value-editor.component';
import { ProductTypeFilterComponent } from './core/product-type-filter/product-type-filter.component';
import { ProductTypeInputComponent } from './core/product-type-input/product-type-input.component';
import { SliderComponent } from './core/slider/slider.component';
import { HeaderComponent } from './header/header.component';
import { SearchDropdownComponent } from './header/search/search-dropdown/search-dropdown.component';
import { SearchComponent } from './header/search/search.component';
import { MaterialModule } from './material/material.module';
import { PageActionsComponent } from './pages/page-actions/page-actions.component';
import { PageAddressesComponent } from './pages/page-addresses/page-addresses.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import {
  DictionariesSubpageComponent,
} from './pages/page-admin/subpages/dictionaries-subpage/dictionaries-subpage.component';
import {
  DictionaryValuesListComponent,
} from './pages/page-admin/subpages/dictionaries-subpage/dictionary-values-list/dictionary-values-list.component';
import { EditProductDialog } from './pages/page-admin/subpages/product-subpage/edit-product/edit-product-dialog';
import { ProductSubpageComponent } from './pages/page-admin/subpages/product-subpage/product-subpage.component';
import {
  EditProductTypeDialog,
} from './pages/page-admin/subpages/product-type-subpage/edit-product-type/edit-product-type-dialog';
import {
  ProductTypeSubpageComponent,
} from './pages/page-admin/subpages/product-type-subpage/product-type-subpage.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageFavoritesComponent } from './pages/page-favorites/page-favorites.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { BestCategoriesComponent } from './pages/page-main/best-categories/best-categories.component';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageProductGroupComponent } from './pages/page-product-group/page-product-group.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { ProductItemComponent } from './pages/page-products/product-item/product-item.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { UserInfoComponent } from './pages/page-profile/user-info/user-info.component';
import { UserSecurityComponent } from './pages/page-profile/user-security/user-security.component';
import { PageRegistrationComponent } from './pages/page-registration/page-registration.component';


const appRoutes: Routes = [
  { path: 'main',                    component: PageMainComponent         },
  { path: 'login',                   component: PageLoginComponent        },
  { path: 'registration',            component: PageRegistrationComponent },
  { path: 'product-types',           component: PageProductGroupComponent },
  { path: 'products',                component: PageProductsComponent     },
  { path: 'products/:productTypeId', component: PageProductsComponent     },
  { path: 'product/:productId',      component: PageProductComponent      },
  { path: 'addresses',               component: PageAddressesComponent    },
  { path: 'actions',                 component: PageActionsComponent      },
  { path: 'actions/:id',             component: PageActionsComponent      },
  { path: 'admin-panel',             component: PageAdminComponent        },
  { path: 'cart',                    component: PageCartComponent         },
  { path: 'favorites',               component: PageFavoritesComponent    },
  { path: 'profile',                 component: PageProfileComponent      },
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
    PageFavoritesComponent,
    UserInfoComponent,
    HistoryListComponent,
    NotificationsListComponent,
    UserSecurityComponent,
    ChangeEmailDialog,
    ChangeSecondaryEmailDialog,
    ChangePasswordDialog
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
    EditProductDialog,
    ChangeEmailDialog,
    ChangeSecondaryEmailDialog,
    ChangePasswordDialog
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
