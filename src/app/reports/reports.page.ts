import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
 data:any=[
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
  {"name":"30","mark":"45","date":"15-02-2022","total":"15"},
  {"name":"40","mark":"55","date":"15-02-2022","total":"15"},
]
customPickerOption = {
  buttons: [{
  text: 'Clear',
     handler: () => this.myForm.controls['myDateCustom'].setValue(null)}]
  }  
myDate:any
  platform: any;
  startDatechoosed:boolean=false
  date: any;
  startDate:any;
  endDate:any;
  seconddate:any;
  myForm: any;
  constructor(private Routingdashboard:Router,public pickerCtrl: PickerController) { }
  
  ngOnInit() {


  }
  fromDate(){
    this.startDatechoosed=true
    if(this.date !=null){
      this.startDate=this.date[0]
      this.date.length > 1 ? this.endDate=this.date[this.date.length-1]:this.endDate='nodata'
      console.log(this.startDate,this.endDate,'date1')
      this.date=null

    }
 
  }

  customPickerOptions: any = {
    buttons: [{
      text: 'Clear',
      handler: () => this.myForm.controls['myDate'].setValue(null)
    }]
  }
  
  route(page:any){

    this.Routingdashboard.navigate([`${page}`])
  }
}
