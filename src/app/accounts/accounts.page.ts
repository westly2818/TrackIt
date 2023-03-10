import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {


milkRate:any=34

  constructor(private Routingdashboard:Router) { }

  ngOnInit() {
    new Chart("mypie", {
      type: "pie",
      data: {
        labels:  ["Earned","Expenditure"],
        datasets: [{
          backgroundColor: [  "#90EE90",
          "#FFCCCB"],
          data: [25000,20000]
        }]
      },
      options: {
        // title: {
        //   display: true,
        //   text: "World Wide Wine Production 2018"
        // }
      }
    });
  }
  route(page:any){

    this.Routingdashboard.navigate([`${page}`])
  }
}
