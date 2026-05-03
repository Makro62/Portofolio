/* ===========================================
   PRODUCT DETAIL PAGE SCRIPT
   Page-specific logic for product detail page
   =========================================== */

// Initialize product detail page
export function initProductDetail() {
  // Product detail initialization
  // Functionality handled by core/components/products.js
}

// Auto-initialize if needed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductDetail);
} else {
  initProductDetail();
}
