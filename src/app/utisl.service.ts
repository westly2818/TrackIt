import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtislService {

  subject:any=new BehaviorSubject(null)
  constructor() { }

  setLoader(params:any){
   return this.subject.next(params)
  }
}
