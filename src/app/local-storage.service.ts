import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


const FAVORITES = 'favorites';
const CART = 'cart'
const SUB = 'sub'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private http: HttpClient) { }

  addFavoriteProduct(item:any) {
    let products : any = localStorage.getItem(FAVORITES);
    if(products != null) {
      localStorage.removeItem(FAVORITES);
      products = JSON.parse(products)
      if(!this.checkIfExist(products, item.id)){
        products.push(item);
      }
      localStorage.setItem(FAVORITES,  JSON.stringify(products));
    } else {
      let items:any=[];
      items.push(item);
      localStorage.setItem(FAVORITES,  JSON.stringify(items));
    }
  }

  checkIfExist(products: any, id: any){
    for(let i = 0; i < products.length; i++){
      if(products[i].id == id){
        return true;
      }
    }
    return false;
  }
 
  getAllFavoriteProduct(){
    return localStorage.getItem(FAVORITES);
  }

  deleteProduct(id:any){
    let items: any = [];
    let products : any = localStorage.getItem(FAVORITES);
    if(products != null){
      localStorage.removeItem(FAVORITES);
      products=JSON.parse(products);
      for(let p of products){
        if(p.id != id) {
          items.push(p);
        }
      }
      localStorage.setItem(FAVORITES,  JSON.stringify(items));
    }
  }

  addProductToCart(item:any){
    console.log("item" , item) 
    let productCart : any =localStorage.getItem(CART);

    if(productCart != null) {
      productCart=JSON.parse(productCart);
      localStorage.removeItem(CART);
      let flag = false;
      for(let i = 0; i < productCart.length; i++){
        if(productCart[i].id == item.id) {
            productCart[i].quantity = Number(productCart[i].quantity) + Number(item.quantity); 
            flag = true;
        }
      }

      if(!flag) {
        productCart.push(item);
      }
      localStorage.setItem(CART , JSON.stringify(productCart));
    } else {
      let items:any=[];
      items.push(item);
      localStorage.setItem(CART , JSON.stringify(items))
    }

    // console.log("productCart" , productCart)
    // if(productCart != null){
    //   productCart=JSON.parse(productCart);
    //   localStorage.removeItem(CART);
    //   productCart.push(item);
    //   localStorage.setItem(CART , JSON.stringify(productCart));
    // }else{
    //   let items:any=[];
    //   items.push(item);
    //   localStorage.setItem(CART , JSON.stringify(items))
    // }
  }

   getAllProductFromCart(){
      return localStorage.getItem(CART);
   }

    deleteProductFromCart(id:any){
      let items: any= [];
      let productCart : any =localStorage.getItem(CART);
      if(productCart != null){
        localStorage.removeItem(CART);
        productCart=JSON.parse(productCart);
        for(let c of productCart){
          if(c.id != id){
            items.push(c);
          }
        }
        localStorage.setItem(CART , JSON.stringify(items))
      }
   }

   removeShoppigCart(){
    localStorage.removeItem(CART);
   }

   saveSubCategory(tag:any){
    localStorage.removeItem(SUB);
    localStorage.setItem(SUB, tag);
   }

   getSubCategory(){
    return localStorage.getItem(SUB);
   }
}