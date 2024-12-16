import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: any[] = [
    { code: '12345', name: 'Esponja Bon Brill', quantity: 50, price: 100, label: '', maxDate: '', imageUrl: 'assets/esponja.jpg' },
    { code: '6789', name: 'Servilletas Danny', quantity: 5, price: 3, label: '', maxDate: '', imageUrl: 'assets/Servilletas.jpg' },
    { code: '111222', name: 'Fundas Camisetas MAXITRI', quantity: 2, price: 5, label: '', maxDate: '', imageUrl: 'assets/Fundas.jpg' },
    // Puedes agregar más productos aquí
  ];

  constructor() {}

  // Obtener un producto por su código
  getProductByCode(code: string) {
    return this.products.find(product => product.code === code);
  }

  // Registrar una transacción (compra o venta)
  registerTransaction(productCode: string, action: string, quantity: number, price: number) {
    const product = this.getProductByCode(productCode);

    if (product) {
      if (action === 'compra') {
        product.quantity += quantity;  // Aumentar la cantidad en inventario
      } else if (action === 'venta') {
        if (product.quantity >= quantity) {
          product.quantity -= quantity;  // Reducir la cantidad en inventario
        } else {
          alert('No hay suficiente cantidad en inventario para la venta');
          return null;
        }
      }
      product.price = price;  // Actualizar el precio unitario
      return product;  // Retornar el producto actualizado
    }

    return null;  // Si no se encuentra el producto
  }
}
