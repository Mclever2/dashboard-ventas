import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  constructor(private firestore: AngularFirestore) {
    this.firestore.collection('test').add({ hola: 'mundo', fecha: new Date() })
      .then(() => console.log('Conexión a Firebase EXITOSA!'))
      .catch(err => console.error('Error de conexión:', err));
  }
}
