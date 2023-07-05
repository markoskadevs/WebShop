import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { Cart } from '../models/cart';
import { EventService } from '../event.service';

@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.css']
})
export class FavoriteProductComponent {

  favoriteList:any=[];
  cart: Cart = new Cart;
  showProducts: any = false;

  constructor( private _snackBar: MatSnackBar,
    private router: Router, 
    private localStorageService:LocalStorageService,
    private eventService: EventService) 
  {}

  ngOnInit(){
   this.getAllFavoriteProduct();
  }

    getAllFavoriteProduct(){
      let products :any = this.localStorageService.getAllFavoriteProduct();
      this.favoriteList=JSON.parse(products)
      if(this.favoriteList.length > 0) {
        this.showProducts = true;
      }
    }

    deleteProduct(id:any){
      this.localStorageService.deleteProduct(id)
      this.getAllFavoriteProduct();
      this.updateCounters(-1);
    }

    addToCart(item:any){
      this.cart=new Cart();
      this.cart.id=item.id;
      this.cart.img=item.img;
      this.cart.name=item.productsInfos[0].name;
      this.cart.code=item.code
      this.cart.price=item.price;
      this.cart.quantity = 1;
      this.localStorageService.addProductToCart(this.cart);
      this.deleteProduct(item.id);
      this.updateCounters(2);

      this._snackBar.open('Продуктот е успешно додаден во кошничка!', 'Затвори', )
    }

    updateCounters(value : any) {
      this.eventService.setValue(value);
    }

    goToDetails(id: any){
      this.router.navigate(['main/details-product', id])
     }
}
