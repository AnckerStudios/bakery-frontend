import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$  = new Subject<string>()

  handle(err: HttpErrorResponse){
    console.log("err",err);
    
    this.error$.next(err.message)
  }

  clear(){
    this.error$.next('')
  }
}
