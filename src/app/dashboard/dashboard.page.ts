import { AfterViewInit,Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomePageModule } from '../home/home.module';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { withLatestFrom } from 'rxjs';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
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
  constructor(private Routingdashboard:Router,private alertController: AlertController) { }


  ngOnInit() {
   
    this.Chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
        datasets: [{
          label: 'litres',
          data: [65, 59, 80, 81, 56, 55, 40],
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
  }
  enterFunction(){
    if(this.morningValue==0){
      this.morningValue+=this.dailyValue
      this.totalDay+= this.dailyValue
this.dailyValue=null

    }
    else{
      if(this.eveningValue==0){
        this.eveningValue+=this.dailyValue
        this.totalDay+= this.dailyValue
        this.dailyValue=null
      }
      else{
        alert('alerady entered for the day')
      }


    }

  }
  route(page:any){

    this.Routingdashboard.navigate([`${page}`])
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
            console.log('delete')
          },
        },
      ],
    });
    alert.style.cssText = '--background: #c4f7ff';
    await alert.present();
  }
resetDbData(){
this.morningValue+=5
}
//  loop=setInterval(() => this.resetDbData(), 5000)
}

