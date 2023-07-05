import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DetailsProductComponent } from './details-product/details-product.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CategoryComponent } from './category/category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DetailsProductComponent,
    CategoryComponent,
    ShoppingCartComponent,
    FavoriteProductComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule, MatRippleModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule ,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatBadgeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
