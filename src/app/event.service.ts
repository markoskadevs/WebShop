import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Order } from './models/order';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
    private _subject = new Subject<any>();
    private _productId = new Subject<any>();

    setValue(event: any) {
      this._subject.next(event);
    }
  
    getValue() {
      return this._subject.asObservable();
    }

    setDetailsProductId(event: any){
      this._productId.next(event);
    }

    getDetailsProductId(){
      return this._productId.asObservable();
    }
}