import { Component, Input, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() salesData: any[] = [];
  @Input() selectedCategory: string | null = null;
  @Input() selectedBrand: string | null = null;
  @Input() chartId = 'container-sales-chart';

  private chart: any;

  ngAfterViewInit() {
    setTimeout(() => this.initChart(), 100);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && (changes.salesData || changes.selectedCategory || changes.selectedBrand)) {
      this.updateChart();
    }
  }

  private async initChart() {
    const container = document.getElementById(this.chartId);
    if (!container) return;

    try {
      const { Column } = await import('@antv/g2plot');
      
      this.chart = new Column(container, {
        data: [],
        xField: 'month',
        yField: 'quantity',
        isGroup: true,
        isStack: true,
        seriesField: 'brand',
        groupField: 'category',
        color: (d) => ({ 
          'Coca Cola': '#E74C3C', 'Pepsi': '#3498DB', 
          'San Luis': '#2ECC71', 'San Mateo': '#1ABC9C' 
        }[d.brand] || '#95A5A6'),
        columnWidthRatio: 0.6,

        columnStyle: {
          radius: [10, 10, 10, 10],
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 6,
          shadowOffsetY: 2,
          cursor: 'pointer' 
        },

        label: {
          position: 'middle',
          content: (item) => item.amount > 0 ? `S/. ${item.amount.toFixed(2)}` : '',
          style: { fill: '#fff', fontSize: 11, fontWeight: 'bold' }
        },
        xAxis: { title: { text: 'Periodo' } },
        yAxis: { title: { text: 'Unidades' } },
        legend: { position: 'right-top' },
        tooltip: {
          formatter: (d) => ({ name: d.brand, value: `${d.quantity} unids | S/. ${d.amount.toFixed(2)}` })
        }
      });

      this.chart.render();
      this.updateChart();
    } catch (e) {
      console.error('Error G2Plot', e);
    }
  }

  private updateChart() {
    let data = this.salesData;
    if (this.selectedCategory && this.selectedCategory !== 'Todo') data = data.filter(d => d.category === this.selectedCategory);
    if (this.selectedBrand && this.selectedBrand !== 'Todo') data = data.filter(d => d.brand === this.selectedBrand);

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const grouped = data.reduce((acc: any, d: any) => {
      const idx = new Date(d.date).getMonth();
      const key = `${idx}-${d.category}-${d.brand}`;
      if (!acc[key]) acc[key] = { monthIndex: idx, month: months[idx], category: d.category, brand: d.brand, quantity: 0, amount: 0 };
      acc[key].quantity += (Number(d.quantity) || 0);
      acc[key].amount += (Number(d.amount) || 0);
      return acc;
    }, {});

    this.chart.changeData(Object.values(grouped).sort((a: any, b: any) => a.monthIndex - b.monthIndex));
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}