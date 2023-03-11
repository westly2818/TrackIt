import { Component, OnInit } from '@angular/core';
import { UtislService } from '../utisl.service';

@Component({
  selector: 'app-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.component.scss'],
})
export class LoadersComponent implements OnInit {

  loaderState:any=false
  constructor(private loaders:UtislService) { }

  ngOnInit() {

    this.loaders.subject.subscribe((ele:any)=>{
      console.log(ele,'loaders------------')
      this.loaderState=ele
    })
  }

}
