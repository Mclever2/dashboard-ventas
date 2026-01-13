import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { Sale } from '../models/sale.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) { }

  getProducts() {
    return this.firestore.collection<Product>('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  addSale(sale: Sale) {

    return this.firestore.collection('sales').add(sale);
  }

  getSales() {
    return this.firestore.collection<Sale>('sales', ref => ref.orderBy('date')).valueChanges();
  }

  async seedDatabase() {
    const products: Product[] = [
      { name: 'Coca Cola Original', category: 'Gaseosas', brand: 'Coca Cola' },
      { name: 'Pepsi Regular', category: 'Gaseosas', brand: 'Pepsi' },
      { name: 'San Luis S/Gas', category: 'Aguas', brand: 'San Luis' },
      { name: 'San Mateo C/Gas', category: 'Aguas', brand: 'San Mateo' }
    ];

    for (const p of products) {
      await this.firestore.collection('products').add(p);
    }
    console.log('Base de datos poblada con productos iniciales');
  }
}