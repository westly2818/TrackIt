import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  constructor(private Routingdashboard:Router) { }

  ngOnInit() {
  }
  route(page:any){

    this.Routingdashboard.navigate([`${page}`])
  }
}
