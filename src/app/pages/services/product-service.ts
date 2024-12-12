import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Datos de productos (puedes tener esto en una base de datos o almacenamiento más persistente)
  private productData: { [key: string]: any } = {
    '12345': { name: 'Esponja Bon Brill', description: 'Esponja', price: 100, code: '12345', quantity: 50, imageUrl: 'assets/esponja.jpg' },
    '6789': { name: 'Servilletas Danny', description: 'Servilletas 100 Unidades', price: 3, code: '6789', quantity: 5, imageUrl: 'assets/Servilletas.jpg' },
    '111222': { name: 'Fundas Camisetas MAXITRI', description: 'Fundas Camisetas 50 unidades', price: 5, code: '111222', quantity: 2, imageUrl: 'assets/Fundas.jpg' },
  };

  constructor() {}

  // Obtener un producto por su código
  getProductByCode(code: string) {
    return this.productData[code] || null;
  }

  // Actualizar la cantidad de un producto
  updateProductQuantity(code: string, quantity: number) {
    const product = this.productData[code];
    if (product) {
      product.quantity = quantity;
    }
  }

  // Obtener todos los productos (para mostrar lista, por ejemplo)
  getAllProducts() {
    return this.productData;
  }

  // Registrar una transacción (compra o venta) y actualizar inventario
  registerTransaction(code: string, action: string, quantity: number) {
    const product = this.productData[code];
    if (product) {
      if (action === 'compra') {
        product.quantity += quantity;
      } else if (action === 'venta') {
        product.quantity -= quantity;
      }
      return product;
    }
    return null;
  }
}
