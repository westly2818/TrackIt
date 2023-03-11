import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import _ from 'lodash';
import * as moment from 'moment';
import { ApiHttpService } from '../services/api-http.service';
import { UtislService } from '../utisl.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  data: any = []
  customPickerOption = {
    buttons: [{
      text: 'Clear',
      handler: () => this.myForm.controls['myDateCustom'].setValue(null)
    }]
  }
  myDate: any
  platform: any;
  startDatechoosed: boolean = false
  date: any;
  TotalLitres:any=0
  days:any=0
  seconddate: any;
  myForm: any;
  selecteddate: any;
  startDate: any = moment().startOf('month').format("YYYY-MM-DD HH:mm:ss")
  endDate: any = moment().endOf('month').format("YYYY-MM-DD HH:mm:ss")
  constructor(private Routingdashboard: Router, public pickerCtrl: PickerController, private apiservice: ApiHttpService,private loaders:UtislService) { }

  ngOnInit() {
    this.loaders.setLoader(true)
    this.selecteddate = { startDate: moment().subtract(3, 'days').startOf('day').toDate(), endDate: moment().endOf('day').toDate() }
    this.getMonthlydata()
  }
  getMonthlydata() {
    let total=0
    this.data=[]
    let query = { "startDate": this.startDate, "endDate": this.endDate }

    let newdata = this.apiservice.get(query).subscribe((ele: any) => {
      let orderByTime = _.orderBy(ele.data, ['timestamp'], ['asc'])
      let tabledata = orderByTime
      this.days=orderByTime.length
      for (let ele of tabledata) {


        let morn = 0
        let even = 0

        var tableObj: any = { "date": moment(ele.timestamp).subtract(330,'minute').format("DD-MM-YYYY") }

        if (ele.morning_litre == null) {
          tableObj['morning'] = 0
          morn = 0
        }
        else {
          tableObj['morning'] =Number( ele.morning_litre)
          morn = Number(ele.morning_litre)
        }
        if (ele.evening_litre == null) {
          tableObj['evening'] = 0
          even = 0
        }
        else {
          tableObj['evening'] = Number(ele.evening_litre)
          even = Number(ele.evening_litre)
        }

        tableObj['total'] = morn + even
        total+=tableObj.total

        this.data.push(tableObj)
      }
      this.TotalLitres= total.toFixed(2)
      this.loaders.setLoader(false)
    console.log(this.TotalLitres);
    


    })
  }
  datePicker(date: any) {
    let start = date['startDate']['$d']
    let end = date['endDate']['$d']
    this.startDate=moment(start).subtract(330,'minutes').format("YYYY-MM-DD HH:mm:ss")
    this.endDate=moment(end).subtract(330,'minutes').format("YYYY-MM-DD HH:mm:ss")
    this.getMonthlydata()
    console.log(start, end, 'date')

  }

  customPickerOptions: any = {
    buttons: [{
      text: 'Clear',
      handler: () => this.myForm.controls['myDate'].setValue(null)
    }]
  }

  route(page: any) {

    this.Routingdashboard.navigate([`${page}`])
  }
}
