import { AfterViewInit,Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomePageModule } from '../home/home.module';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { withLatestFrom } from 'rxjs';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiHttpService } from '../services/api-http.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit { 
  // @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  // @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  barChart: any;
  Chart:any
  dailyValue:any
  milkentered=0
  data:any
  morningValue=0
  eveningValue=0
  totalDay=0
  time:any
  litresTilldate=0
  MonthlyAvg=0
  morningAvg=0
  eveningAvg=0
  eveningCustom:any
  morningCustom:any
  datechoosed:any
  closeResult: string | undefined;
todaysData:any=[]
  constructor(private Routingdashboard:Router,private alertController: AlertController,private modalService: NgbModal,private apiservice:ApiHttpService) { }


  ngOnInit() {
 
    this.Chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'litres',
          data: [],
          backgroundColor: [
     '#32CD32','#E55451'
          ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)',
          //   'rgba(50, 205, 50, 1)'
          // ],
          // borderWidth: 2,
          barThickness: 20,      
        }]
      },
      options: {
        plugins: {
          tooltip: {displayColors:false,backgroundColor:'#4f5459'},
          legend: {
            display: false,
          },
        },
  
        scales: {
          x: {
            ticks: {
              font: {
                  size: 8,
                  family:'sans-serif'
              }
          },
            grid: {
              display: false,
            },
           
          },
          y: {
       border:{display:false},

            ticks:{display: false},
            grid: {
              display: false,
              
            },
           
          },
        }
      }
    });
    this.getGraphdata()
    this.morng_eveng_data()
    this.getMonthlydata()
    // console.log(this.Chart.data)
  }


  getGraphdata(){
    let query={"startDate":moment().subtract(7,'day').startOf('day').format("YYYY-MM-DD HH:mm:ss"),"endDate":moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")}

    let data=this.apiservice.get(query).subscribe((ele:any)=>{
ele.data.forEach((element:any) => {

  let date=moment(element.timestamp).format('DD-MM')
  let addeddata=Number(element.morning_litre)+Number(element.evening_litre)
  this.Chart.data.labels.push(date)
  this.Chart.data.datasets[0].data.push(Number(addeddata))

});
    
    })
  }
  getMonthlydata(){
    let query={"startDate":moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"),"endDate":moment().endOf('month').format("YYYY-MM-DD HH:mm:ss")}

    let data=this.apiservice.get(query).subscribe((ele:any)=>{
var morningCount=0
var eveningCount=0
var morningLitres=0
var eveningLitres=0

ele.data.forEach((element:any) => {
  if(element.morning_litre!=null)morningLitres+=Number(element.morning_litre) ;morningCount++

  if(element.morning_litre!=null)eveningLitres+=Number(element.evening_litre) ; eveningCount++

  // this.Chart.data.datasets[0].data.push(Number(addeddata))

});
this.litresTilldate=Number( (Number(morningLitres) + Number(eveningLitres)).toFixed(2))
this.MonthlyAvg=Number( Number(this.litresTilldate/ele.data.length).toFixed(2))
this.morningAvg=Number(Number(morningLitres/morningCount).toFixed(2))
this.eveningAvg=Number(Number(eveningLitres/eveningCount).toFixed(2))

    
    })
  }
  async dataentry(){
    let insertdata={'litre':this.dailyValue}
   if(this.todaysData.length===0){
   
     (await this.apiservice.insert(insertdata)).subscribe((res:any)=>{
      console.log(res)
     this.morng_eveng_data()
     this. getMonthlydata()
    })
   }
   else{
    if(this.todaysData[0].morning_litre===null || this.todaysData[0].evening_litre===null){
      (await this.apiservice.insert(insertdata)).subscribe((res:any)=>{
        console.log(res)
        this.morng_eveng_data()
        this. getMonthlydata()
       
      })

    }
    else{
      alert('already entered  ')
    }
   }
     
 
this.dailyValue=null


  }
  async morng_eveng_data(){
    this.todaysData=[]
    let query={"startDate":moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"),
    "endDate":moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")}
this.apiservice.get(query).subscribe((obj:any)=>{
  if(obj.data.length>0){
    this.morningValue=obj.data[0].morning_litre
    this.eveningValue=obj.data[0].evening_litre
    this.totalDay=Number(this.morningValue)+Number(this.eveningValue)
  this.todaysData.push(obj.data[0])


  }
  else{
    this.morningValue=0
    this.eveningValue=0
    this.totalDay=0
  }




})
  }
  route(page:any){

    this.Routingdashboard.navigate([page])
    // this.Chart.destroy()
  }

  async confirmDelete(get:any) {
    console.log(get,'data')
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
          cssClass:'delete-button',
          handler: () => {
            if(this.todaysData.length>0){
              let reqObj:any={}
            reqObj['id']=  this.todaysData[0].id
              if(get=='morn'){
                reqObj['time']='morning_litre'
              }
              else{
                reqObj['time']='evening_litre'
              }
              this.apiservice.delete(reqObj).subscribe((ele:any)=>{
                if(ele.status==='success'){
                  this.morng_eveng_data()
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
  customData(){
    console.log(this.eveningCustom,'=============')
    this.eveningCustom=null
  }

openLg(content: any) {
  this.modalService.open(content, { size: 'lg' });
}

//  loop=setInterval(() => this.resetDbData(), 5000)
}

