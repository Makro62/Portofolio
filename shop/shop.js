/* ===========================================
   SHOP PAGE SCRIPT
   Page-specific logic for shop page
   =========================================== */

// Initialize shop page
export function initShop() {
  // Shop page initialization
  // Functionality handled by core/components/products.js
}

// Auto-initialize if needed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShop);
} else {
  initShop();
}
