
import {Component, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { LocalStorageService } from '../local-storage.service';
import { EventService } from '../event.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  
})
export class CategoryComponent {
  categoryId :any = "";
  language:any="en"
  list:any=[];
  cart: Cart = new Cart;
  inFavoriteList: any = [];
  selectedQuantity: any = 1;

  constructor(private route:ActivatedRoute, 
    private _snackBar: MatSnackBar, 
    private service:UserService,
    private router: Router,
    private localStorageService:LocalStorageService,
    private eventService: EventService) { }

  ngOnInit(){
    let sub = this.localStorageService.getSubCategory();
    if(isNaN(Number(sub))) {
      this.getAllProductsBySubcategory(sub)
    } else {
      this.getProductsByCategoryId()
    }
  }

  getAllProductsBySubcategory(sub:any){
    this.list=[];
    this.service.getAllProductsBySubcategory(sub).subscribe(data => {
    if(data != null && data != undefined) {
      this.list=data;
      setTimeout(async () => {  
        this.getAllFavoriteProduct();
      }, 200);
    } else {
      this._snackBar.open('Настана грешка!', 'Затвори', ); 
    }
  });

  }

  goToDetails(id: any){
    this.router.navigate(['main/details-product', id])
   }

  getProductsByCategoryId(){
    let id = this.localStorageService.getSubCategory();
    this.list=[];
    this.service.getProductsByCategoryId(Number(id),this.language).subscribe(data => {
    if(data != null && data != undefined) {
     this.list=data;
     setTimeout(async () => {  
      this.getAllFavoriteProduct();
    }, 200);
    } else {
     this._snackBar.open('Настана грешка!', 'Затвори', ); 
    }
  });
  }
  
  addToFavorites(product:any){
    this.localStorageService.addFavoriteProduct(product);
    const element = document.getElementById(product.id);
    if (element) {
      if(element.style.color == "red"){
        this.updateCounters(-1);
        element.style.color = "black";
      } else {
        this.updateCounters(1);
        element.style.color = "red";
      }
    } 
  }

  getAllFavoriteProduct(){
    let products :any = this.localStorageService.getAllFavoriteProduct();
    this.inFavoriteList=JSON.parse(products)
    console.log("hereeeee" , this.inFavoriteList);
    if(this.inFavoriteList.length > 0) {
      for(let item of this.inFavoriteList) {
        const element = document.getElementById(item.id);
        if(element) {
          element.style.color = "red";
        }
      }
    }
  }

  addToCart(item:any){
    this.cart=new Cart();
    this.cart.id=item.id;
    this.cart.img=item.img;
    this.cart.name=item.productsInfos[0].name;
    this.cart.code=item.code
    this.cart.price=item.price;
    this.cart.quantity=this.selectedQuantity;
    this.localStorageService.addProductToCart(this.cart);
    this.selectedQuantity = 1;
    this.updateCounters(2);

    this._snackBar.open('Продуктот е успешно додаден во кошничка!', 'Затвори', )
  }


  updateCounters(value : any) {
    this.eventService.setValue(value);
  }

  onKey(event : any) {
    this.selectedQuantity = Number(event.target.value);
  }

}
