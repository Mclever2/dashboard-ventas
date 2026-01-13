import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  constructor(private dataService: DataService) {
    // DESCOMENTAR ESTA LINEA UNA SOLA VEZ, GUARDAR, ESPERAR LA CONSOLA Y LUEGO COMENTAR DE NUEVO
    //this.dataService.seedDatabase(); 
  }
}
