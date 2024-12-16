import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/pages/services/product-service';  // Asegúrate de tener la ruta correcta del servicio
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule], // Importa los módulos necesarios
})
export class ProductDetailsPage implements OnInit {
  productCode: string = '';
  product: any = null;

  quantity: number = 0;
  price: number = 0;
  date: string = '';
  selectedAction: string = '';
  showOptions: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productCode = params.get('productCode')!;
      this.product = this.productService.getProductByCode(this.productCode);
    });
  }

  goBack() {
    this.router.navigate(['/inventory-search']);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  registerTransaction() {
    if (!this.product) {
      alert('Producto no encontrado');
      return;
    }

    if (!this.selectedAction) {
      alert('Por favor, selecciona una acción (Compra o Venta)');
      return;
    }

    if (this.quantity <= 0 || this.price <= 0) {
      alert('Por favor, ingresa una cantidad y precio válidos');
      return;
    }

    // Pasar el cuarto argumento (price) correctamente
    const updatedProduct = this.productService.registerTransaction(
      this.productCode, 
      this.selectedAction, 
      this.quantity, 
      this.price // Asegúrate de pasar también el precio
    );

    if (updatedProduct) {
      alert('Transacción registrada correctamente');
      this.product = updatedProduct; // Actualizar producto con las nuevas cantidades
    } else {
      alert('No hay suficiente inventario para realizar la venta');
    }
    
    this.clearForm();
  }

  clearForm() {
    this.quantity = 0;
    this.price = 0;
    this.date = '';
    this.selectedAction = '';
    this.showOptions = false;
  }

  // Definir el método getLabelColor
  getLabelColor(label: string): string {
    switch(label.toLowerCase()) {
      case 'nuevo':
        return 'green';
      case 'rebajado':
        return 'red';
      case 'promocion':
        return 'blue';
      default:
        return 'black'; // color por defecto
    }
  }
}
