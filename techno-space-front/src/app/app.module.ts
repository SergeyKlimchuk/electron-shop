import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderDropdownComponent } from './header/header-dropdown/header-dropdown.component';
import { SearchComponent } from './header/search/search.component';
import { SearchDropdownComponent } from './header/search/search-dropdown/search-dropdown.component';
import { SliderComponent } from './slider/slider.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageActionsComponent } from './pages/page-actions/page-actions.component';
import { PageAddressesComponent } from './pages/page-addresses/page-addresses.component';
import { BestCategoriesComponent } from './pages/page-main/best-categories/best-categories.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageRegistrationComponent } from './pages/page-registration/page-registration.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

const appRoutes: Routes = [
  { path: 'main',         component: PageMainComponent        },
  { path: 'login',        component: PageLoginComponent       },
  { path: 'registration', component: PageRegistrationComponent},
  { path: 'product/:id',  component: PageProductComponent     },
  { path: 'addresses',    component: PageAddressesComponent   },
  { path: 'actions',      component: PageActionsComponent     },
  { path: 'actions/:id',  component: PageActionsComponent     },
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
    HeaderDropdownComponent,
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
    PageRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MaterialModule
    // other imports here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
