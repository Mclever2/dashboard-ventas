import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';


import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { SalesChartModule } from '../../components/sales-chart/sales-chart.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,  
    RouterModule,
    WelcomeRoutingModule,
    NzSelectModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzMessageModule,
    SalesChartModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }