import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngIf y *ngFor
import { FormsModule } from '@angular/forms'; // Importante para [(ngModel)]
import { RouterModule } from '@angular/router';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

// Imports de Ng-Zorro
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  imports: [
    CommonModule, // <--- NO OLVIDAR
    FormsModule,  // <--- NO OLVIDAR
    RouterModule,
    WelcomeRoutingModule,
    NzSelectModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzMessageModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }