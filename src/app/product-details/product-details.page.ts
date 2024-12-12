import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../pages/services/product-service'; // Asegúrate de importar el servicio si lo necesitas
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule], // Aquí añades los módulos que necesites
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

    const updatedProduct = this.productService.registerTransaction(this.productCode, this.selectedAction, this.quantity);

    if (updatedProduct) {
      alert('Transacción registrada correctamente');
      this.product = updatedProduct; // Actualizar producto con las nuevas cantidades
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
    this.showOptions = false;
  }
}
