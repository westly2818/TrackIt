import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { NgChartsModule } from 'ng2-charts';
import { AppModule } from '../app.module';
import { HomePageModule } from '../home/home.module';
import { LoadersComponent } from '../loaders/loaders.component';
@NgModule({
  declarations: [DashboardPage,LoadersComponent]
,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgChartsModule,
    HomePageModule
  ],
  exports:[
    LoadersComponent
  ]
})
export class DashboardPageModule {}
