import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import moment from 'moment';
import { ApiHttpService } from '../services/api-http.service';
import { UtislService } from '../utisl.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  PageIn:boolean=true
milkRate:any=34
 earned:any=0
 spent:number=0
 amountEntered:any
datas:any=[]
bgcolor:any=[]

  constructor(private Routingdashboard:Router,private apiservice:ApiHttpService,private loaders:UtislService) { }

  ngOnInit() {

    this.loaders.setLoader(true)
    this.calc()
    this.piechart()

  }

 async enterExpenditure(){
    if(this.amountEntered!=null){
      let money=this.amountEntered
      this.amountEntered=null
      let expenseObj={"expenses":true,
      "amount":money
        
      }
      ;(await this.apiservice.insert(expenseObj)).subscribe((res: any) => {
        console.log(res)
        if(res.status=='success'){
          this.amountEntered=null
    this.calc()
      
        }

      })
    }
    console.log(this.amountEntered)
  }
  piechart(){
    setTimeout(()=>{
   let pie= new Chart("mypie", {
      type: "pie",
      data: {
        labels:  ["Earned","Expenditure"],
        datasets: [{
          backgroundColor: this.bgcolor,
          data: this.datas
        }]
      },
      options: {
        // title: {
        //   display: true,
        //   text: "World Wide Wine Production 2018"
        // }
      }
    });
    console.log(pie.data.datasets)
    this.loaders.setLoader(false)

  },2000)
  }
  calc(){
    this.spent=0
    this.earned=0
    let query = { "expenses":true,"startDate": moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"), 
    "endDate": moment().endOf('month').format("YYYY-MM-DD HH:mm:ss") }

    let moneydata = this.apiservice.get(query).subscribe((ele: any) => {
for(let obj of ele.data){
this.spent+=Number(obj.amount)
}
this.datas.push(this.spent)
this.bgcolor.push('#FFCCCB')

    })
    let milkdataquery = {"startDate": moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"), 
    "endDate": moment().endOf('month').format("YYYY-MM-DD HH:mm:ss") }
    let milkdata = this.apiservice.get(milkdataquery).subscribe((ele: any) => {
      var morningLitres = 0
      var eveningLitres = 0
      for(let element of ele.data){
        morningLitres += Number(element.morning_litre);
        eveningLitres += Number(element.evening_litre);
      }
      let tofixedData=((morningLitres+eveningLitres) * this.milkRate).toFixed(2)
      this.datas.push(Number(tofixedData))
      this.bgcolor.push("#90EE90")

      this.earned=tofixedData
      
          })

  }
  route(page:any){

    this.Routingdashboard.navigate([`${page}`])
  }
}
