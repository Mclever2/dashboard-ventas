export interface Sale {
  id?: string;
  amount: number;       // Venta total en soles
  quantity: number;     // Cantidad de unidades vendidas
  date: Date;           
  productName: string;  
  category: string;     
  brand: string;        
}