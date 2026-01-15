import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  LogoutOutline, 
  GoogleOutline  
} from '@ant-design/icons-angular/icons';

const icons = [
    MenuFoldOutline, 
    MenuUnfoldOutline, 
    DashboardOutline, 
    FormOutline, 
    LogoutOutline, 
    GoogleOutline  
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}