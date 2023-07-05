import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { UserService } from '../user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
name:any;
lastname:any;
email:any;
phone:any;
city:any;
code:any;
address:any;
number:any;
cartList:any=[];
order: Order = new Order;
product :Product = new Product;
totalPrice:any=0;
shipping:any=200;
ddv:any=5;
finalPrice:any=0;
showProducts: any = false;


constructor( private _snackBar: MatSnackBar,
  private router: Router,
  private localStorageService:LocalStorageService,
  private service: UserService,
  private eventService: EventService) 
{}

ngOnInit(){
  this.getAllProductFromCart()
}

getAllProductFromCart(){
  this.totalPrice = 0;
  this.finalPrice = 0;
  let productCart :any = this.localStorageService.getAllProductFromCart();
  this.cartList=JSON.parse(productCart)
  if(this.cartList.length > 0) {
    this.showProducts = true;
  }
  for(let i = 0; i < this.cartList.length; i++){
      this.totalPrice = this.totalPrice + (Number(this.cartList[i].price) * Number(this.cartList[i].quantity));
  }
  this.calculateDdv();
}

deleteProductFromCart(id:any){
  this.localStorageService.deleteProductFromCart(id);
  this.getAllProductFromCart();
  this.updateCounters(-2);
}

 makeOrder(){
  if(this.name != "" && this.lastname != "" && this.email != "" && this.phone !="" && this.city != "" && this.code != "" && this.address != "" && this.number != ""){
    this.order=new Order;
    this.order.name=this.name;
    this.order.lastname=this.lastname;
    this.order.email=this.email;
    this.order.phone=this.phone;
    this.order.city=this.city;
    this.order.code=this.code;
    this.order.address=this.address;
    this.order.number=this.number;

    if(this.cartList != null && this.cartList.length > 0){
      for(let i = 0; i < this.cartList.length; i++) {
        this.product=new Product
        this.product.price=this.cartList[i].price;
        this.product.quantity=this.cartList[i].quantity;
        this.product.code=this.cartList[i].code;
        this.order.products.push(this.product)
      }
    }

    this.service.makeOrder(this.order).subscribe(data => { 
      if(data != null && data != undefined) {
        this.localStorageService.removeShoppigCart();
        this._snackBar.open('Вашата порачка е УСПЕШНА', 'Затвори', );
      } else {
        this._snackBar.open('Настана грешка,пробајте повторно', 'Затвори', );
      }
   });
  }else{
    this._snackBar.open('Мора сите полиња да се потполнети!', 'Затвори', );
  }
  }

  calculateDdv(){
    this.finalPrice=this.totalPrice + this.shipping
    let ddv = this.finalPrice * (this.ddv/100);
    this.finalPrice=this.finalPrice + ddv;
  }
  goToDetails(id: any){
    this.router.navigate(['main/details-product', id])
   }

   updateCounters(value : any) {
    this.eventService.setValue(value);
  }
 } 


