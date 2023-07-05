import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalStorageService } from '../local-storage.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { EventService } from '../event.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  language: any = "en";
  menus:any=[];
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  value : any;

  constructor( private _snackBar: MatSnackBar,
    private router: Router, 
    private service:UserService,
    private localStorageService:LocalStorageService,
    private route:ActivatedRoute,
    private eventService: EventService) 
  {}

  ngOnInit(){
    this.getMenu();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    ); 
    console.log(this.router.url);
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

  goToCategory(id:any){
    this.localStorageService.saveSubCategory(id);
    if(this.router.url.includes("/main/category")){
      location.reload();
    } else {
      this.router.navigate(['main/category'])
    }
  }

  getAllProductsBySubcategory(tags:any){
    let id = 0;
    this.localStorageService.saveSubCategory(tags);
    if(this.router.url.includes("/main/category")){
      location.reload();
    } else {
      this.router.navigate(['main/category'])
    }
  }


  onKeypressEvent(event: any){
    let value = event.target.value;
    this.service.search(value).subscribe(data => {
      this.options = [];
      if(data != null && data != undefined) {
          let products:any= data;
          products.filter((e: { productsInfos: { name: string; }[]; }) => this.options.push(e.productsInfos[0].name));
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  search() {
    this.service.getProductByTitle(this.value).subscribe(data => {
      if(data != null) {
        this.eventService.setDetailsProductId(data);
        this.router.navigate(['main/details-product', data])
      }
    });
  }
}

  



