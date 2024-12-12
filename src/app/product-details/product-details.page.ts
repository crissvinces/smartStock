import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Definimos la interfaz del producto
interface Product {
  name: string;
  description: string;
  price: number;
  code: string;
  quantity: number;
  imageUrl: string;  // URL de la imagen del producto
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],  // Asegúrate de incluir ambos módulos
})
export class ProductDetailsPage implements OnInit {
  productCode: string = ''; // Guardamos el código del producto
  product: Product | null = null; // Almacenamos el producto encontrado

  quantity: number = 0;
  price: number = 0;
  date: string = '';
  selectedAction: string = '';  // Para seleccionar entre compra y venta
  showOptions: boolean = false;  // Mostrar las opciones de compra/venta
  
  productData: { [key: string]: Product } = {
    '12345': { 
      name: 'Silla', 
      description: 'Silla de Madera', 
      price: 100, 
      code: '12345', 
      quantity: 50, 
      imageUrl: 'assets/silla.jpeg'  // Ruta de la imagen
    },
    '67890': { 
      name: 'Producto B', 
      description: 'Descripción del producto B', 
      price: 150, 
      code: '67890', 
      quantity: 30, 
      imageUrl: 'assets/images/productB.jpg'  // Ruta de la imagen
    },
    // Añadir más productos según sea necesario
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productCode = params.get('productCode')!;
      this.product = this.productData[this.productCode] || null;
    });
  }

  goBack() {
    this.router.navigate(['/inventory-search']); // Cambia '/home' por la ruta de tu página anterior
  }

  // Mostrar opciones para seleccionar entre compra y venta
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  // Registrar transacción (compra o venta)
  registerTransaction() {
    if (!this.product) {
      alert('Producto no encontrado');
      return;
    }

    // Validar que se haya seleccionado una acción (compra/venta)
    if (!this.selectedAction) {
      alert('Por favor, selecciona una acción (Compra o Venta)');
      return;
    }

    // Validar cantidad y precio
    if (this.quantity <= 0 || this.price <= 0) {
      alert('Por favor, ingresa una cantidad y precio válidos');
      return;
    }

    const transaction = {
      product: this.product,
      action: this.selectedAction,
      quantity: this.quantity,
      price: this.price,
      date: this.date,
    };

    // Aquí puedes enviar la transacción al backend o guardarla en un servicio
    console.log('Transacción registrada:', transaction);
    alert('Transacción registrada correctamente!');
    
    // Después de registrar, puedes limpiar los campos o redirigir
    this.clearForm();
  }

  // Limpiar el formulario después de registrar
  clearForm() {
    this.quantity = 0;
    this.price = 0;
    this.date = '';
    this.selectedAction = '';
    this.showOptions = false;
  }

}
