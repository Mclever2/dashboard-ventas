import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import { DataService } from './services/data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  constructor(public afAuth: AngularFireAuth, private dataService: DataService) {}

  async loginConGoogle() {
    try {
      const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log('Login exitoso:', res.user?.displayName);
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }

  logout() {
    this.afAuth.signOut();
  }

  downloadAllCsv() {
    this.dataService.getSales().pipe(take(1)).subscribe((sales: any[]) => {
      const headers = ['ID','Fecha','Producto','Categoría','Marca','Cantidad','Monto'];
      const rows = (sales || []).map(s => {
        const date = s.date ? new Date(s.date).toISOString() : '';
        return [s.id || '', date, s.productName || '', s.category || '', s.brand || '', String(s.quantity ?? ''), String(s.amount ?? '')];
      });
      const csvRows = [headers, ...rows];
      const csvContent = csvRows.map(r => r.map(String).map(v => `"${v.replace(/"/g,'""')}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ventas-todas-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }, err => {
      console.error('Error fetching sales for CSV:', err);

    });
  }
}