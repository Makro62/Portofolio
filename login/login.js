/* ===========================================
   LOGIN PAGE SCRIPT
   Page-specific logic for login page
   =========================================== */

// Initialize login page
export function initLogin() {
  // Login page initialization
  // Auth functionality handled by core/js/modules/auth.js
}

// Auto-initialize if needed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogin);
} else {
  initLogin();
}
