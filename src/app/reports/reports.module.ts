import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReportsPage } from './reports.page';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxDaterangepickerMd.forRoot()
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
