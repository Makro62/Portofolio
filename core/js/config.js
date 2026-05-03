/* ===========================================
   CONFIGURATION
   Konfigurasi aplikasi
   =========================================== */

export const CONFIG = {
  // Path Configuration
  paths: {
    shared: '/shared/',
    pages: '/pages/',
    images: '/assets/images/'
  },
  
  // Authentication
  auth: {
    storageKey: 'freshfruits_user',
    defaultCredentials: {
      username: 'admin',
      password: 'admin'
    }
  },
  
  // Cart
  cart: {
    storageKey: 'freshfruits_cart',
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

