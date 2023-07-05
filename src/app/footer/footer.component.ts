import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  language: any = "en";
  mark: any;
  email: any;
  address: any;
  description: any;
  freeShipping: any;
  phone: any;

  constructor(private router:Router , private service : UserService,private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.getAllSettings()
  }

  getAllSettings() {
    this.service.getAllSettings(this.language).subscribe(data => {
      if(data != null && data != undefined) {
        console.log(data)
        this.email=data.email;
        this.address=data.address;
        this.description=data.infoList[0].description;
        this.freeShipping=data.freeShipping;
        this.phone=data.phone;
        this.language=data.infoList[0].language
        this.mark=data.infoList[0].mark;
  
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }

}
