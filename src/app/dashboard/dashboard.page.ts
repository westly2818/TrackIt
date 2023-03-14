import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomePageModule } from '../home/home.module';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { withLatestFrom } from 'rxjs';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHttpService } from '../services/api-http.service';
import * as _ from 'lodash'
import { UtislService } from '../utisl.service';
import { promises } from 'dns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  // @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('canvas') canvasdata: any;

  chart = [];
  labels: any = [];
  bgcolor: any = []
  data: any = [];
  barChart: any;
  Chart: any | undefined
  dailyValue: any
  milkentered = 0
  // data:any
  morningValue = 0
  eveningValue = 0
  totalDay = 0
  time: any
  litresTilldate = 0
  MonthlyAvg = 0
  morningAvg = 0
  eveningAvg = 0
  eveningCustom: any = null
  morningCustom: any = null
  datechoosed: any = null
  closeResult: string | undefined;
  todaysData: any = []
  PageIn: boolean = true;
  constructor(private Routingdashboard: Router, private alertController: AlertController,
    private modalService: NgbModal, private apiservice: ApiHttpService, private loaders: UtislService) { }


  async ngOnInit() {

    this.loaders.setLoader(true)
    const authToken = localStorage.getItem('authToken');
    console.log(authToken, 'token')

    this.getGraphdata()
    this.morng_eveng_data()
    this.getMonthlydata().then((res: any) => {
      if (res == true) {
        this.chartdata()
      }
    })


  }
  chartdata() {
    return new Promise((resolve, reject) => {


      setTimeout(() => {

        this.Chart = new Chart('mybarchart', {
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: [{
              label: 'litres',
              data: this.data,
              backgroundColor: this.bgcolor,

              barThickness: 20,
            }]
          },
          options: {
            plugins: {
              tooltip: { displayColors: false, backgroundColor: '#4f5459' },
              legend: {
                display: false,
              },
            },

            scales: {
              x: {
                ticks: {
                  font: {
                    size: 8,
                    family: 'sans-serif'
                  }
                },
                grid: {
                  display: false,
                },

              },
              y: {
                border: { display: false },

                ticks: { display: false },
                grid: {
                  display: false,

                },

              },
            }
          }
        });
        console.log(this.Chart.data)

      }, 1000);
      resolve(true)
    })
  }
  async getGraphdata() {
    return new Promise((resolve, reject) => {

      this.labels = [];
      this.bgcolor = []
      this.data = [];
      let query = { "startDate": moment().subtract(7, 'day').startOf('day').format("YYYY-MM-DD HH:mm:ss"), "endDate": moment().endOf('day').format("YYYY-MM-DD HH:mm:ss") }

      let data = this.apiservice.get(query).subscribe((ele: any) => {
        let orderByTime = _.orderBy(ele.data, ['timestamp'], ['asc'])
        let lastData: any;

        orderByTime.forEach((element: any, index: any) => {

          let date = moment(element.timestamp).subtract(330, 'minute').format('DD-MM')
          let addeddata = Number(element.morning_litre) + Number(element.evening_litre)

          this.labels.push(date)
          this.data.push(Number(addeddata))
          if (index > 0) {
            if (addeddata > lastData) {
              lastData = addeddata
              this.bgcolor.push('#32CD32')
            }
            else {
              lastData = addeddata
              this.bgcolor.push('#E55451')
            }

          }
          else {
            lastData = addeddata
            this.bgcolor.push('#32CD32')
          }


        });
        this.loaders.setLoader(false)
      })

resolve(true)
    })
    // this.ngAfterViewInit()
  }
  async getMonthlydata() {
    return new Promise((resolve, reject) => {


      let query = { "startDate": moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"), "endDate": moment().endOf('month').format("YYYY-MM-DD HH:mm:ss") }

      let data = this.apiservice.get(query).subscribe((ele: any) => {
        var morningCount = 0
        var eveningCount = 0
        var morningLitres = 0
        var eveningLitres = 0

        ele.data.forEach((element: any) => {
          if (element.morning_litre != null) morningLitres += Number(element.morning_litre); morningCount++

          if (element.morning_litre != null) eveningLitres += Number(element.evening_litre); eveningCount++

          // this.Chart.data.datasets[0].data.push(Number(addeddata))

        });
        this.litresTilldate = Number((Number(morningLitres) + Number(eveningLitres)).toFixed(2))
        this.MonthlyAvg = Number(Number(this.litresTilldate / ele.data.length).toFixed(2))
        this.morningAvg = Number(Number(morningLitres / morningCount).toFixed(2))
        this.eveningAvg = Number(Number(eveningLitres / eveningCount).toFixed(2))

        resolve(true)

      })
    })
  }
  async dataentry() {
    this.loaders.setLoader(true)
    let insertdata = { 'litre': this.dailyValue }
    if (this.todaysData.length === 0) {

      (await this.apiservice.insert(insertdata)).subscribe(async (res: any) => {
      await  this.morng_eveng_data()
       await this.getMonthlydata()
       await this.getGraphdata().then((res:any)=>{
          if(res==true){
            // this.Chart.data.datasets[0].data=this.data
            // this.Chart.update()
            // console.log(this.Chart.data)
            // console.log(this.data)
            this.loaders.setLoader(false)
          }
          
        })
     
      })


    }
    else {
      if (this.todaysData[0].morning_litre === null || this.todaysData[0].evening_litre === null) {
        (await this.apiservice.insert(insertdata)).subscribe(async (res: any) => {
          console.log(res)


         await this.morng_eveng_data()
         await this.getMonthlydata()
          await this.getGraphdata().then((res:any)=>{
            if(res==true){
              this.Chart.data.datasets[0].data=this.data
              // this.Chart.update()
            
              // console.log(this.Chart.data)
              // console.log(this.data)
              this.loaders.setLoader(false)
            }
          })

        })

      }
      else {
        alert(`You're done for the day.`)
        this.loaders.setLoader(false)
      }
    }
    

    this.dailyValue = null


  }
  async morng_eveng_data() {
    this.todaysData = []
    let query = {
      "startDate": moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"),
      "endDate": moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")
    }
    this.apiservice.get(query).subscribe((obj: any) => {
      if (obj.data.length > 0) {
        this.morningValue = obj.data[0].morning_litre
        this.eveningValue = obj.data[0].evening_litre
        this.totalDay = Number(this.morningValue) + Number(this.eveningValue)
        this.todaysData.push(obj.data[0])


      }
      else {
        this.morningValue = 0
        this.eveningValue = 0
        this.totalDay = 0
      }




    })
  }
  route(page: any) {

    this.Routingdashboard.navigate([page])
    // this.Chart.destroy()
  }

  async confirmDelete(get: any) {
    console.log(get, 'data')
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          cssClass: 'delete-button',
          handler: async()  => {
            this.loaders.setLoader(true)

            if (this.todaysData.length > 0) {
              let reqObj: any = {}
              reqObj['id'] = this.todaysData[0].id
              if (get == 'morn') {
                reqObj['time'] = 'morning_litre'
              }
              else {
                reqObj['time'] = 'evening_litre'
              }
              this.apiservice.delete(reqObj).subscribe(async (ele: any) => {
                if (ele.status === 'success') {

                  this.morng_eveng_data()
                  this.getMonthlydata()
                 await this.getGraphdata().then((res:any)=>{
                    if(res==true){
                      // this.Chart.data.datasets[0].data=this.data
                      // console.log(this.Chart.data)
                      // console.log(this.data)
                      this.loaders.setLoader(false)
                    }
                  })
        
                }
              })
            }
            console.log('deleted')
          },
        },
      ],
    });
    alert.style.cssText = '--background: #c4f7ff';
    await alert.present();
  }
  customData() {
    this.loaders.setLoader(true)
    let customObj: any = {}
    customObj['customInsert'] = true
    customObj['mornLitre'] = this.morningCustom
    customObj['eveningLitre'] = this.eveningCustom
    if (this.datechoosed != undefined && (customObj.mornLitre != null || customObj.eveningLitre != null)) {
      customObj['startDate'] = moment(this.datechoosed).startOf('day').format("YYYY-MM-DD HH:mm:ss")
      customObj['endDate'] = moment(this.datechoosed).endOf('day').format("YYYY-MM-DD HH:mm:ss")

      let insert = this.apiservice.insert(customObj).subscribe((res: any) => {
        console.log(res)
        if (res.status == 'success') {
          this.loaders.setLoader(false)
          this.morng_eveng_data()
          this.getMonthlydata()
          this.Chart.update()

        }
        this.datechoosed = null
        this.eveningCustom = null
        this.morningCustom = null
      })

    }

    console.log(customObj);

    // this.eveningCustom = null
  }
  logout() {
    localStorage.removeItem('authToken');
  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  refresh(){
    this.morng_eveng_data()
    this.getGraphdata()
    this.getMonthlydata()
    console.log('called');
    
  }

}

function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

