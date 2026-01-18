import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  selectedCategory: string | null = null;
  selectedBrand: string | null = null;
  
  brands: string[] = [];
  salesData: any[] = [];

  constructor(private dataService: DataService, private message: NzMessageService) { }

  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.dataService.getSales().subscribe((data: any) => {
      this.salesData = (data || [])
        .filter((d: any) => d !== null && d !== undefined)
        .map((d: any) => ({
          id: d.id,
          amount: Number(d.amount) || 0,
          quantity: Number(d.quantity) || 0,
          date: d.date ? new Date(d.date) : new Date(),
          productName: d.productName || 'Sin Producto',
          category: d.category || 'Sin Categoría',
          brand: d.brand || 'Generico'
        }));
    }, (err: any) => {
      console.warn('getSales error (ignored):', err);
      this.salesData = this.salesData || [];
    });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.selectedBrand = null;

    if (category === 'Gaseosas') {
      this.brands = ['Coca Cola', 'Pepsi'];
    } else if (category === 'Aguas') {
      this.brands = ['San Luis', 'San Mateo'];
    } else if (category === 'Todo') {
      this.brands = [];
    } else {
      this.brands = [];
    }
  }

  onBrandChange(brand: string) {
    this.selectedBrand = brand;
  }
}