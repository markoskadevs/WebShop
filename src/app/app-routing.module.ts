import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: '', component:MainComponent},
  { path: 'main', component:MainComponent,
     children:[
       { path : "home" , component:HomeComponent},
       { path : "navbar" , component:NavbarComponent},
       { path : "footer" , component:FooterComponent},
       { path : "details-product/:id" , component:DetailsProductComponent},
       { path : "category" , component:CategoryComponent},
       { path : "shopping-cart" , component:ShoppingCartComponent},
       { path : "favorite-product" , component:FavoriteProductComponent}
  ]
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', useHash: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
