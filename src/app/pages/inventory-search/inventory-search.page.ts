import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // Importa Router
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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

  constructor(private router: Router) { } // Inyecta Router

  async startScan() {
    try {
      // Verifica si la cámara está permitida
      await BarcodeScanner.checkPermission({ force: true });

      // Oculta el contenido de la app para mejorar la experiencia del escaneo
      BarcodeScanner.hideBackground();

      this.isScanning = true;

      const result = await BarcodeScanner.startScan(); // Empieza el escaneo

      this.isScanning = false;

      if (result?.hasContent) {
        this.scannedResult = result.content; // Guarda el contenido escaneado
        console.log('Producto escaneado:', this.scannedResult);

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

  // Método para volver a la página anterior
  goBack() {
    this.router.navigate(['/home']); // Cambia '/home' por la ruta de tu página anterior
  }

  stopScan() {
    BarcodeScanner.stopScan(); // Detiene el escaneo
    this.isScanning = false;
  }

  ngOnInit() {
  }
}
