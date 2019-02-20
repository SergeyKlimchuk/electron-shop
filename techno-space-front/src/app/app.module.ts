import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderDropdownComponent } from './header/header-dropdown/header-dropdown.component';
import { SearchComponent } from './header/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchDropdownComponent } from './header/search/search-dropdown/search-dropdown.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderDropdownComponent,
    SearchComponent,
    SearchDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
