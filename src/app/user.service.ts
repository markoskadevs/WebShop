import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url  = environment.url;

  constructor(private http: HttpClient) { }

  getAllSettings(language: any){
    let queryParams = {"language":language  };
    return this.http.get<any>(this.url + 'public/settings', {params: queryParams});
  }

  getMenu(language : any){
    let queryParams = {"language":language};
    return this.http.get<any>(this.url + 'public/menu', {params: queryParams});
  }

  getProductsByCategoryId(id:any, language : any){
    let queryParams = {"language":language};
    return this.http.get<any>(this.url + 'public/products/'+id, {params: queryParams});
  }

  getProductById(id:any, language : any){
    let queryParams = {"language":language};
    return this.http.get<any>(this.url + 'public/product-details/'+id, {params: queryParams});
  }
  getAllRecommended(language : any){
    let queryParams = {"language":language};
    return this.http.get<any>(this.url + 'public/recommended-products', {params: queryParams});
  }

  makeOrder(order:Order){
    return this.http.post(this.url + 'public/make-order', order);
  }

  getAllBanners(){
    return this.http.get<any>(this.url + 'public/banner');
  }

  getAllProductsBySubcategory(sub:any){
    return this.http.post(this.url + 'public/subcategory', {subcategory:sub});
  }

  search(value:any){
    return this.http.post(this.url + 'public/search' , {value:value});
  }

  getProductByTitle(value:any){
    return this.http.post(this.url + 'public/product-by-title', {title:value});
  }

  getCategoryId(value:any){
    return this.http.post(this.url + 'public/get-category-id', {title:value});
  }
}
