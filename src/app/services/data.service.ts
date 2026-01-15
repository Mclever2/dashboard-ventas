import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo: Apollo) { }

  getProducts() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getProducts {
            id
            name
            category
            brand
          }
        }
      `
    }).valueChanges.pipe(map((result: any) => result.data.getProducts));
  }

  getSales() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getSales {
            id
            amount
            quantity
            date
            productName
            category
            brand
          }
        }
      `,
      pollInterval: 1000,
      errorPolicy: 'all'
    }).valueChanges.pipe(map((result: any) => (result && result.data && result.data.getSales) ? result.data.getSales : []));
  }

  addSale(sale: Sale) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($amount: Float!, $quantity: Int!, $productName: String!, $category: String!, $brand: String!) {
          addSale(amount: $amount, quantity: $quantity, productName: $productName, category: $category, brand: $brand) {
            id
          }
        }
      `,
      variables: {
        amount: Number(sale.amount),
        quantity: Number(sale.quantity),
        productName: sale.productName,
        category: sale.category,
        brand: sale.brand
      },
      refetchQueries: [{
        query: gql`
          query {
            getSales {
              id
              amount
              quantity
              date
              productName
              category
              brand
            }
          }
        `
      }]
    });
  }
}