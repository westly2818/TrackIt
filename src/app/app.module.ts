import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
// import {Chart} from 'chart.js'
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material'
import { HttpClientModule } from '@angular/common/http';
import { ApiHttpService } from './services/api-http.service';
export function highchartsModules() {
  return [stock, more];
  }
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    NgChartsModule,ChartModule, HighchartsChartModule,  MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
  ],
  exports:[
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,},ApiHttpService
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
