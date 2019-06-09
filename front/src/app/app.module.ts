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
import { ChangeEmailDialog } from './pages/page-profile/user-security/change-email/change-email-dialog';
import { ChangePasswordDialog } from './pages/page-profile/user-security/change-password/change-password-dialog';
import { ChangeSecondaryEmailDialog } from './pages/page-profile/user-security/change-secondary-email/change-secondary-email-dialog';
import { DictionaryValueInputComponent } from './core/dictionary-value-input/dictionary-value-input.component';
import { HistoryListComponent } from './core/history-list/history-list.component';
import { LoadableImageComponent } from './core/loadable-image/loadable-image.component';
import { NotificationsListComponent } from './core/notifications-list/notifications-list.component';
import { BillStatusPipe } from './core/pipes/bill-status.pipe';
import { NumberSplitPipe } from './core/pipes/number-split.pipe';
import {
  ProductPropertyValueEditorComponent,
} from './core/product-property-value-editor/product-property-value-editor.component';
import { ProductTypeFilterComponent } from './core/product-type-filter/product-type-filter.component';
import { ProductTypeInputComponent } from './core/product-type-input/product-type-input.component';
import { SliderComponent } from './core/slider/slider.component';
import { HeaderComponent } from './header/header.component';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { PointSelectorComponent } from './pages/page-addresses/point-selector/point-selector.component';
import { MapSubpageComponent } from './pages/page-admin/subpages/map-subpage/map-subpage.component';
import { ProductSliderComponent } from './core/product-slider/product-slider.component';
import { ActionsSubpageComponent } from './pages/page-admin/subpages/actions-subpage/actions-subpage.component';
import { PageActionComponent } from './pages/page-actions/page-action/page-action.component';
import { ProductSelectDialog } from './core/product-select/product-select.component';
import { PageActionViewComponent } from './pages/page-actions/page-action-view/page-action-view.component';
import { CartButtonComponent } from './core/cart-button/cart-button.component';
import { FavoritesButtonComponent } from './core/favorites-button/favorites-button.component';
import { UserAddressesComponent } from './pages/page-profile/user-addresses/user-addresses.component';
import { AddressViewComponent } from './core/address-view/address-view.component';
import { AddressEditComponent } from './core/address-edit/address-edit.component';
import { CityInputComponent } from './core/city-input/city-input.component';
import { BooleanInputComponent } from './core/boolean-input/boolean-input.component';
import { PagePaymentComponent } from './pages/page-payment/page-payment.component';
import { SelectDeliveryAddressDialogComponent } from './core/dialogs/select-delivery-address-dialog/select-delivery-address-dialog.component';
import { SelectDeliveryAddressComponent } from './core/select-delivery-address/select-delivery-address.component';
import { ProductListMinComponent } from './core/product-list-min/product-list-min.component';
import { BillsSubpageComponent } from './pages/page-admin/subpages/bills-subpage/bills-subpage.component';
import { BillsListComponent } from './core/bills-list/bills-list.component';
import { BillEditDialogComponent } from './pages/page-admin/subpages/bills-subpage/bill-edit/bill-edit.component';


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
  { path: 'actions/:actionId',       component: PageActionViewComponent   },
  { path: 'admin-panel',             component: PageAdminComponent        },
  { path: 'cart',                    component: PageCartComponent         },
  { path: 'favorites',               component: PageFavoritesComponent    },
  { path: 'profile',                 component: PageProfileComponent      },
  { path: 'payment',                 component: PagePaymentComponent      },
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
    SliderComponent,
    PageNotFoundComponent,
    PageMainComponent,
    PageProductComponent,
    PageActionsComponent,
    PageAddressesComponent,
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
    ChangePasswordDialog,
    BillStatusPipe,
    PointSelectorComponent,
    MapSubpageComponent,
    ProductSliderComponent,
    ActionsSubpageComponent,
    PageActionComponent,
    ProductSelectDialog,
    PageActionViewComponent,
    CartButtonComponent,
    FavoritesButtonComponent,
    UserAddressesComponent,
    AddressViewComponent,
    AddressEditComponent,
    CityInputComponent,
    BooleanInputComponent,
    PagePaymentComponent,
    SelectDeliveryAddressDialogComponent,
    SelectDeliveryAddressComponent,
    ProductListMinComponent,
    BillsSubpageComponent,
    BillsListComponent,
    BillEditDialogComponent
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
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiToken
  }),
    RouterModule.forRoot(
      appRoutes
    ),
    MaterialModule,
    InfiniteScrollModule
    // other imports here
  ],
  entryComponents: [
    EditProductTypeDialog,
    EditProductDialog,
    ChangeEmailDialog,
    ChangeSecondaryEmailDialog,
    ChangePasswordDialog,
    ProductSelectDialog,
    SelectDeliveryAddressDialogComponent,
    BillEditDialogComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent],
  exports: [BillStatusPipe]
})
export class AppModule { }
