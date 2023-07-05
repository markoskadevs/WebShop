import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { LocalStorageService } from '../local-storage.service';
import { EventService } from '../event.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  name: any;
  tag: any;
  language: any = "en";
  loading = false;
  shopCount = 0;
  favCount = 0;
 
  constructor(private router:Router, 
              private service : UserService,
              private _snackBar: MatSnackBar,
              private localStorageService:LocalStorageService,
              private eventService: EventService) {}

  home(){
        this.router.navigate(['/main/home']);
  }
  ngOnInit(){
    this.eventService.getValue().forEach(event => {
      if(event != null) {
        if(event == 1){
          this.favCount++;
        } else if (event == -1){
          this.favCount--;
        } else if (event == -2){
          this.shopCount--;
        } else{
          this.shopCount++;
        }
      }
    });
    this.getAllSettings()
    this.getCounters();
  }

  getCounters() {
    let productCart: any = this.localStorageService.getAllProductFromCart();
    this.shopCount = JSON.parse(productCart).length;
    let favCart: any = this.localStorageService.getAllFavoriteProduct();
    this.favCount = JSON.parse(favCart).length;
  }

  getAllSettings() {
    this.service.getAllSettings(this.language).subscribe(data => {
      if(data != null && data != undefined) {
        this.name=data.infoList[0].name;
        this.tag=data.infoList[0].tag;
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }


  goTo(value : any) {
    this.router.navigate([value])
  }
}


