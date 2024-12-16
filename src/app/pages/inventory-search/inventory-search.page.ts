import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ProductService } from 'src/app/pages/services/product-service';

@Component({
  selector: 'app-inventory-search',
  templateUrl: 'inventory-search.page.html',
  styleUrls: ['inventory-search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class InventorySearchPage implements OnInit {
  scannedResult: string = '';
  isScanning: boolean = false;
  product: any = null;

  constructor(private router: Router, private productService: ProductService) {}

  async startScan() {
    try {
      // Solicitar permisos para la cámara
      const permission = await BarcodeScanner.checkPermission({ force: true });
      if (permission.granted) {
        // Ocultar el fondo y comenzar el escaneo con cámara trasera por defecto
        BarcodeScanner.hideBackground();
        this.isScanning = true;

        const result = await BarcodeScanner.startScan(); // Sin configuración de preferFrontCamera

        this.isScanning = false;

        if (result?.hasContent) {
          this.scannedResult = result.content;
          console.log('Producto escaneado:', this.scannedResult);

          this.product = this.productService.getProductByCode(this.scannedResult);

          // Redirige a la página de detalles del producto
          this.router.navigate(['/product-details', this.scannedResult]);
        } else {
          alert('No se detectó ningún código QR.');
        }
      } else {
        alert('Permiso denegado para acceder a la cámara.');
      }
    } catch (error) {
      this.isScanning = false;
      console.error('Error al escanear:', error);
      alert('Hubo un problema al escanear. Inténtalo de nuevo.');
    }
  }

  stopScan() {
    BarcodeScanner.stopScan();
    this.isScanning = false;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {}
}
