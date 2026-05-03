/* ===========================================
   CONFIGURATION
   Konfigurasi aplikasi
   =========================================== */

import { STORAGE_KEYS } from './constants.js'

export const CONFIG = {
  // Path Configuration
  paths: {
    shared: '/shared/',
    pages: '/pages/',
    images: '/assets/images/'
  },
  
  // Authentication
  auth: {
    storageKey: STORAGE_KEYS.USER,
    defaultCredentials: {
      username: 'admin',
      password: 'admin'
    }
  },
  
  // Cart
  cart: {
    storageKey: STORAGE_KEYS.CART,
    deliveryFee: 2.50
  },
  
  // UI
  ui: {
    productsPerPage: 12,
    flashSaleItems: 8,
    animationDuration: 300
  },
  
  // Default Page
  defaultPage: 'home',
  
  // Protected Routes
  protectedRoutes: ['profile']
};

export default CONFIG;

