import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // Importa Router
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ProductService } from 'src/app/pages/services/product-service'; // Importa el servicio

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
  product: any = null; // Almacena el producto escaneado

  constructor(private router: Router, private productService: ProductService) { } // Inyecta Router

  async startScan() {
    try {
      await BarcodeScanner.checkPermission({ force: true });
      BarcodeScanner.hideBackground();
      this.isScanning = true;

      const result = await BarcodeScanner.startScan();

      this.isScanning = false;

      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log('Producto escaneado:', this.scannedResult);

        this.product = this.productService.getProductByCode(this.scannedResult);

        // Redirige a la página de detalles del producto con el código escaneado
        this.router.navigate(['/product-details', this.scannedResult]);
      } else {
        alert('No se detectó ningún código QR.');
      }
    } catch (error) {
      this.isScanning = false;
      console.error('Error al escanear:', error);
      alert('Hubo un problema al escanear. Inténtalo de nuevo.');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  stopScan() {
    BarcodeScanner.stopScan();
    this.isScanning = false;
  }

  ngOnInit() {}
}
