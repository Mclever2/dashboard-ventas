import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {
  saleForm: FormGroup;
  loading = false;

  categories = ['Gaseosas', 'Aguas'];
  products = [
    { name: 'Coca Cola', category: 'Gaseosas', brand: 'Coca Cola' },
    { name: 'Pepsi', category: 'Gaseosas', brand: 'Pepsi' },
    { name: 'San Luis', category: 'Aguas', brand: 'San Luis' },
    { name: 'San Mateo', category: 'Aguas', brand: 'San Mateo' }
  ];

  availableBrands: string[] = [];
  selectedCategory: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private message: NzMessageService
  ) {
    this.saleForm = this.fb.group({
      category: ['', Validators.required],
      brand: [{ value: '', disabled: true }, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      productName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.availableBrands = [];
    this.saleForm.patchValue({ brand: '', productName: '' });

    if (category) {
      if (category === 'Gaseosas') {
        this.availableBrands = ['Coca Cola', 'Pepsi'];
      } else if (category === 'Aguas') {
        this.availableBrands = ['San Luis', 'San Mateo'];
      }
      this.saleForm.get('brand')?.enable();
    } else {
      this.saleForm.get('brand')?.disable();
    }
  }

  onBrandChange(brand: string): void {

    const product = this.products.find(p => p.brand === brand);
    if (product) {
      this.saleForm.patchValue({ productName: product.name });
    }
  }

  submitForm(): void {
    if (this.saleForm.invalid) {
      this.message.error('Por favor completa todos los campos correctamente');
      return;
    }

    this.loading = true;
    const formValue = this.saleForm.getRawValue();


    this.dataService.addSale({
      id: '',
      amount: parseFloat(formValue.amount),
      quantity: parseInt(formValue.quantity, 10),
      productName: formValue.productName,
      category: formValue.category,
      brand: formValue.brand,
      date: new Date()
    }).subscribe(
      (response: any) => {
        this.loading = false;
        this.message.success('¡Venta agregada exitosamente!');
        this.saleForm.reset();
        this.availableBrands = [];
        this.selectedCategory = null;
      },
      (error: any) => {
        this.loading = false;
        console.error('Error al agregar venta:', error);
        this.message.error('Error al agregar la venta. Intenta nuevamente.');
      }
    );
  }

  resetForm(): void {
    this.saleForm.reset();
    this.saleForm.get('brand')?.disable();
    this.availableBrands = [];
    this.selectedCategory = null;
  }
}
