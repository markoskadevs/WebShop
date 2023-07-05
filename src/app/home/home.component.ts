import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorageService } from '../local-storage.service';
import { Cart } from '../models/cart';
import { EventService } from '../event.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  language: any = "en";
  menus:any=[];
  listRecommended:any=[];
  cart: Cart = new Cart;
  banners:any=[];
  selectedQuantity = 1;
  inFavoriteList: any = [];

  constructor( private _snackBar: MatSnackBar,
    private router: Router, 
    private service:UserService,
    private localStorageService:LocalStorageService,
    private eventService: EventService) 
  {}

  ngOnInit(){
    this.getMenu();
    this.getAllRecommended();
    this.getAllBanners();
  }
  
  getAllFavoriteProduct(){
    let products :any = this.localStorageService.getAllFavoriteProduct();
    this.inFavoriteList=JSON.parse(products)
    if(this.inFavoriteList.length > 0) {
      for(let item of this.inFavoriteList) {
        const element = document.getElementById(item.id);
        if(element) {
          element.style.color = "red";
        }
      }
    }
  }

  goToCategory(id:any){
    this.localStorageService.saveSubCategory(id);
    this.router.navigate(['main/category'])
  }

  goToDetails(id: any){
    this.router.navigate(['main/details-product', id])
   }

  getMenu(){
    this.menus=[];
    this.service.getMenu(this.language).subscribe(data => {
      if(data != null && data != undefined) {
        this.menus=data;
        console.log(this.menus)
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }

  getAllRecommended(){
    this.listRecommended=[];
    this.service.getAllRecommended(this.language).subscribe(data => {
      if(data != null && data != undefined) {
        this.listRecommended=data;
        setTimeout(async () => {  
          this.getAllFavoriteProduct();
        }, 200);
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }

  addToFavorites(product:any){
    const element = document.getElementById(product.id);
    if (element) {
      if(element.style.color == "red"){
        this.updateCounters(-1);
        element.style.color = "black";
        this.localStorageService.deleteProduct(product.id)
      } else {
        element.style.color = "red";
        this.updateCounters(1);
        this.localStorageService.addFavoriteProduct(product);
      }
    } 
  }

  addToCart(item:any){
    this.updateCounters(2);
    this.cart=new Cart();
    this.cart.id=item.id;
    this.cart.img=item.img;
    this.cart.name=item.productsInfos[0].name;
    this.cart.code=item.code
    this.cart.price=item.price;
    this.cart.quantity=this.selectedQuantity;
    this.localStorageService.addProductToCart(this.cart);
    this.selectedQuantity = 1;

    this._snackBar.open('Продуктот е успешно додаден во кошничка!', 'Затвори', )
  }

  getAllBanners(){ 
    this.banners = [];
    this.service.getAllBanners().subscribe(data => { 
      if(data != null && data != undefined) {
        this.banners=data;
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }


  onKey(event : any) {
    this.selectedQuantity = Number(event.target.value);
  }

  updateCounters(value : any) {
    this.eventService.setValue(value);
  }

  goToBanner(banner : any) {
    this.localStorageService.saveSubCategory(banner.category);
    if(this.router.url.includes("/main/category")){
      location.reload();
    } else {
      this.router.navigate(['main/category'])
    }
  }
}


