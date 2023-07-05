import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Cart } from '../models/cart';
import { LocalStorageService } from '../local-storage.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent {
  list:any=[];
  language:any="en"
  description:any;
  img:any;
  name:any;
  code:any;
  smallDescription:any;
  category:any;
  collection:any;
  material:any;
  tag:any;
  price:any
  cart: Cart = new Cart;
  id:any;
  listRecommended:any=[];
  inFavoriteList: any = [];
  selectedQuantity: any = 1;

  constructor(private route:ActivatedRoute, 
    private _snackBar: MatSnackBar, 
    private service:UserService,
    private localStorageService:LocalStorageService,
    private router: Router, 
    private eventService: EventService) { 

    }

  ngOnInit(){
    let productId = this.route.snapshot.paramMap.get('id');
    let searched = false;
    this.eventService.getDetailsProductId().forEach(event => {
      if(event != null && Number(event) > 0 && Number(event) != Number(productId)) {
        searched = true;
        this.getProductById(event)
      }
    });
    
    if(!searched) {
      this.getProductById(productId);
    }
  }


  getProductById(id: any){
    this.service.getProductById(id, this.language).subscribe(data => {
    if(data != null && data != undefined) {
        this.id=data.id;
        this.name=data.productsInfos[0].name
        this.description=data.productsInfos[0].description
        this.img=data.img
        this.code=data.code
        this.smallDescription=data.productsInfos[0].smallDescription
        this.collection=data.productsInfos[0].collection
        this.material=data.productsInfos[0].material
        this.tag=data.category.tag
        this.price=data.price
        this.getProductsByCategory(data.category.id)
    } else {
     this._snackBar.open('Настана грешка!', 'Затвори', ); 
    }
  });
  }

  addToCart(){
    this.cart=new Cart();
    this.cart.id=this.id;
    this.cart.img=this.img;
    this.cart.name=this.name;
    this.cart.code=this.code
    this.cart.price=this.price;
    this.cart.quantity=this.selectedQuantity;
    this.localStorageService.addProductToCart(this.cart);
    this.updateCounters(2);
    this.selectedQuantity = 1;

    this._snackBar.open('Продуктот е успешно додаден во кошничка!', 'Затвори', )
  }

  goToDetails(id: any){
    this.getProductById(id);
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

  onKey(event : any) {
    this.selectedQuantity = Number(event.target.value);
  }

  getProductsByCategory(id:any){
    this.listRecommended = [];
    this.service.getProductsByCategoryId(id , this.language).subscribe(data => { 
      console.log(data)
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

  updateCounters(value : any) {
    this.eventService.setValue(value);
  }

  }
  

