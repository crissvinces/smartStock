import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // Importa Router
import { ProductService } from 'src/app/pages/services/product-service'; // Asegúrate de importar el servicio si lo necesitas

@Component({
  selector: 'app-sales-register',
  templateUrl: 'sales-register.page.html',
  styleUrls: ['sales-register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule], // Aquí añades los módulos que necesites
})
export class SalesRegisterPage implements OnInit {
  quantity: number = 0;
  price: number = 0;
  date: string = '';
  showOptions: boolean = false;
  selectedAction: string = '';
  productCode: string = '';
  product: any = {};

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  // Método para regresar a la página anterior
  goBack() {
    this.router.navigate(['../']);  // O usar un 'routerLink' en la plantilla
  }

  // Método para buscar el producto basado en el código
  searchProduct() {
    this.product = this.productService.getProductByCode(this.productCode);

    if (!this.product) {
      alert('Producto no encontrado');
    }
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

    const updatedProduct = this.productService.registerTransaction(this.productCode, this.selectedAction, this.quantity);

    if (updatedProduct) {
      alert('Transacción registrada correctamente');
      this.product = updatedProduct;  // Actualizar producto con las nuevas cantidades
    } else {
      alert('Error al registrar la transacción');
    }

    this.clearForm();
  }

  clearForm() {
    this.quantity = 0;
    this.price = 0;
    this.date = '';
    this.selectedAction = '';
    this.productCode = '';
    this.product = {};
  }
}
