import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
  IonSelect, IonSelectOption, IonLabel, IonInput, IonItem, IonDatetime 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sales-register',
  templateUrl: 'sales-register.page.html',
  styleUrls: ['sales-register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SalesRegisterPage implements OnInit {

  // Propiedades para la transacción
  quantity: number = 0;        // Cantidad de producto
  price: number = 0;           // Precio del producto
  date: string = '';           // Fecha de la transacción
  showOptions: boolean = false; // Para mostrar/ocultar opciones
  selectedAction: string = '';  // Acción seleccionada (compra/venta)
  productCode: string = '';     // Código del producto (para buscarlo en los datos)
  product: any = {};            // Almacena el producto encontrado

  productData: { [key: string]: any } = {
    '12345': { name: 'Silla', price: 100, quantity: 50 },
    '67890': { name: 'Producto B', price: 150, quantity: 30 },
    // Más productos si es necesario
  };

  constructor(private router: Router) { } // Inyectamos el servicio Router

  ngOnInit() {
    // Inicialización de propiedades si es necesario
  }

  // Método para alternar la visibilidad de opciones
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  // Método para registrar la transacción
  registerTransaction() {
    // Buscar el producto por su código
    this.product = this.productData[this.productCode];

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

    // Registrar la transacción
    const transaction = {
      product: this.product,
      action: this.selectedAction,
      quantity: this.quantity,
      price: this.price,
      date: this.date,
    };

    // Aquí puedes actualizar el stock del producto según la acción (compra o venta)
    if (this.selectedAction === 'compra') {
      this.product.quantity += this.quantity;
    } else if (this.selectedAction === 'venta') {
      this.product.quantity -= this.quantity;
    }

    console.log('Transacción registrada:', transaction);
    alert('Transacción registrada correctamente!');

    // Limpiar el formulario después de registrar
    this.clearForm();
  }

  // Limpiar el formulario después de registrar
  clearForm() {
    this.quantity = 0;
    this.price = 0;
    this.date = '';
    this.selectedAction = '';
    this.productCode = '';  // Limpiar el código del producto
    this.product = {};  // Limpiar la información del producto
  }

  // Método para volver a la página anterior
  goBack() {
    this.router.navigate(['/home']); // Cambia '/home' por la ruta de tu página anterior
  }

  // Método que se llama cuando se escanea el código QR
  handleQRCodeScanned(scannedCode: string) {
    // Actualizar el código de producto con el escaneado
    this.productCode = scannedCode;

    // Llamar a la función para actualizar los datos del producto
    this.searchProduct();
  }

  // Método para buscar el producto por código
  searchProduct() {
    if (this.productCode) {
      // Buscar el producto según el código
      this.product = this.productData[this.productCode];
    
      if (!this.product) {
        alert('Producto no encontrado');
      }
    } else {
      // Si no hay código, restablecer el producto
      this.product = {};
    }
  }
}
