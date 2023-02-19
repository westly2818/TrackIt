import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private Routingdashboard:Router) { }

  ngOnInit() {
  }

  route(page:any){

    this.Routingdashboard.navigate([`${page}`])
  }
}
