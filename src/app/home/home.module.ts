import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
export function highchartsModules() {
  return [stock, more];
  }

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChartModule,
    HighchartsChartModule
  ],
  providers: [  {provide:HIGHCHARTS_MODULES,useFactory:highchartsModules}],
  declarations: [HomePage,LineChartComponent],
  exports:[LineChartComponent]
})
export class HomePageModule {}
