/* ===========================================
   LOADING UTILITIES
   Helper functions untuk loading states
   =========================================== */

/**
 * Show loading overlay
 * @param {string} message - Loading message (optional)
 */
export function showLoading(message = 'Loading...') {
  let overlay = document.getElementById('loading-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div class="loading-overlay-content">
        <div class="loading-spinner"></div>
        <div class="loading-overlay-text">${message}</div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  
  setTimeout(() => overlay.classList.add('active'), 10);
}

/**
 * Hide loading overlay
 */
export function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
}

/**
 * Generate skeleton product cards
 * @param {number} count - Number of skeleton cards
 * @returns {string} HTML string
 */
export function generateSkeletonProducts(count = 8) {
  const skeletons = [];
  
  for (let i = 0; i < count; i++) {
    skeletons.push(`
      <div class="skeleton-product-card">
        <div class="skeleton skeleton-product-image"></div>
        <div class="skeleton skeleton-product-rating"></div>
        <div class="skeleton skeleton-product-title"></div>
        <div class="skeleton skeleton-product-price"></div>
        <div class="skeleton skeleton-product-button"></div>
      </div>
    `);
  }
  
  return skeletons.join('');
}

/**
 * Generate skeleton list items
 * @param {number} count - Number of skeleton items
 * @returns {string} HTML string
 */
export function generateSkeletonList(count = 5) {
  const skeletons = [];
  
  for (let i = 0; i < count; i++) {
    skeletons.push(`
      <div class="skeleton-list-item">
        <div class="skeleton skeleton-list-image"></div>
        <div class="skeleton-list-content">
          <div class="skeleton skeleton-text medium"></div>
          <div class="skeleton skeleton-text short"></div>
          <div class="skeleton skeleton-text long"></div>
        </div>
      </div>
    `);
  }
  
  return skeletons.join('');
}

/**
 * Show page loader (top bar)
 */
export function showPageLoader() {
  let loader = document.getElementById('page-loader');
  
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="page-loader-bar"></div>';
    document.body.appendChild(loader);
  }
}

/**
 * Hide page loader
 */
export function hidePageLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.remove(), 300);
  }
}

/**
 * Add loading state to button
 * @param {HTMLElement} button - Button element
 */
export function setButtonLoading(button) {
  if (button) {
    button.classList.add('loading');
    button.disabled = true;
  }
}

/**
 * Remove loading state from button
 * @param {HTMLElement} button - Button element
 */
export function removeButtonLoading(button) {
  if (button) {
    button.classList.remove('loading');
    button.disabled = false;
  }
}

