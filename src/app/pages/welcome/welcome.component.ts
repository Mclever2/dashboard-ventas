import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy {

  selectedCategory: string | null = null;
  selectedBrand: string | null = null;
  
  brands: string[] = [];
  salesData: any[] = [];

  chartQuantity: any;
  chartAmount: any;

  constructor(private dataService: DataService, private message: NzMessageService) { }

  ngOnInit() {
    this.loadSales();
  }

  ngAfterViewInit() {
    this.initChart();
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
          brand: d.brand || ''
        }));

      this.filterChart();
    }, (err: any) => {
      console.warn('getSales error (ignored):', err);
      this.salesData = this.salesData || [];
      this.filterChart();
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

    this.filterChart();
  }

  onBrandChange(brand: string) {
    this.selectedBrand = brand;
    this.filterChart();
  }

  filterChart() {
    let filteredData = this.salesData;

    if (this.selectedCategory && this.selectedCategory !== 'Todo') {
      filteredData = filteredData.filter(d => d.category === this.selectedCategory);
    }
    if (this.selectedBrand && this.selectedBrand !== 'Todo') {
      filteredData = filteredData.filter(d => d.brand === this.selectedBrand);
    }

    const grouped: { [k: string]: { category: string, quantity: number, amount: number } } = {};
    filteredData.forEach((d: any) => {
      const key = d.category || 'Sin Categoría';
      if (!grouped[key]) grouped[key] = { category: key, quantity: 0, amount: 0 };
      grouped[key].quantity += (Number(d.quantity) || 0);
      grouped[key].amount += (Number(d.amount) || 0);
    });

    const quantityData = Object.values(grouped).map(g => ({ category: g.category, quantity: g.quantity }));
    const amountData = Object.values(grouped).map(g => ({ category: g.category, amount: g.amount }));

    if (this.chartQuantity && typeof this.chartQuantity.changeData === 'function') {
      this.chartQuantity.changeData(quantityData);
    }
    if (this.chartAmount && typeof this.chartAmount.changeData === 'function') {
      this.chartAmount.changeData(amountData);
    }

    const list = document.getElementById('chart-data-list');
    if (list) {
      list.innerHTML = Object.values(grouped).map(g => `<div>${g.category}: ${g.quantity} unidades / S/ ${g.amount.toFixed(2)}</div>`).join('');
    }
  }

  async initChart() {
    const containerQty = document.getElementById('container-quantity');
    const containerAmt = document.getElementById('container-amount');
    if (!containerQty || !containerAmt) return;

    try {
      const mod: any = await import('@antv/g2plot');
      const Column = mod && mod.Column ? mod.Column : null;
      if (!Column) throw new Error('Column not available');

      this.chartQuantity = new Column(containerQty, {
        data: [],
        xField: 'category',
        yField: 'quantity',
        label: {
          position: 'middle',
          style: { fill: '#FFFFFF', opacity: 0.85 }
        },
        xAxis: { label: { autoHide: true, autoRotate: false } },
        meta: { category: { alias: 'Categoría' }, quantity: { alias: 'Cantidad' } },
        color: '#5B8FF9'
      });

      this.chartAmount = new Column(containerAmt, {
        data: [],
        xField: 'category',
        yField: 'amount',
        label: {
          position: 'middle',
          style: { fill: '#FFFFFF', opacity: 0.85 }
        },
        xAxis: { label: { autoHide: true, autoRotate: false } },
        meta: { category: { alias: 'Categoría' }, amount: { alias: 'Venta (S/)' } },
        color: '#5AD8A6'
      });

      this.chartQuantity.render();
      this.chartAmount.render();

      this.filterChart();
    } catch (e) {
      const holder = document.getElementById('container-grafico');
      if (holder) holder.innerHTML = `<div class="chart-placeholder">G2Plot no disponible. Se muestran datos en tabla:<div id="chart-data-list"></div></div>`;
      this.filterChart();
    }
  }

  ngOnDestroy() {
    if (this.chartQuantity && typeof this.chartQuantity.destroy === 'function') {
      this.chartQuantity.destroy();
    }
    if (this.chartAmount && typeof this.chartAmount.destroy === 'function') {
      this.chartAmount.destroy();
    }
  }
}