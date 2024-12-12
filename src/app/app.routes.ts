import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'inventory-search',
    loadComponent: () => import('./pages/inventory-search/inventory-search.page').then(m => m.InventorySearchPage),
  },
  {
    path: 'sales-register',
    loadComponent: () => import('./pages/sales-register/sales-register.page').then(m => m.SalesRegisterPage),
  },
  {
    path: 'product-details/:productCode', // Ruta con parámetro productCode
    loadComponent: () => import('./product-details/product-details.page').then(m => m.ProductDetailsPage),
  },
  {
    path: 'product-details',
    loadComponent: () => import('./product-details/product-details.page').then( m => m.ProductDetailsPage)
  },
];
