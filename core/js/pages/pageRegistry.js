/* ===========================================
   PAGE REGISTRY
   Maps page names to their async initializers
   =========================================== */

import { initializeProfilePage } from '../modules/profile.js';

const pageInitializers = {
  home: async () => {
    const module = await import('../../../home/home.js');
    module.initBannerCarousel?.();
  },
  shop: async () => {
    const [productsModule, shopEventsModule] = await Promise.all([
      import('../../components/products.js'),
      import('../modules/shopEvents.js')
    ]);

    productsModule.renderCategories?.();
    productsModule.renderProducts?.();
    productsModule.renderFlashSale?.();
    productsModule.setupCategoryCarousel?.();
    productsModule.updateCategoryCarousel?.();

    shopEventsModule.setupShopEvents?.();
  },
  'product-detail': async () => {
    const productsModule = await import('../../components/products.js');
    productsModule.setupProductDetailPage?.();
  },
  profile: async () => {
    await initializeProfilePage();
  }
};

/**
 * Run page-specific initializer when available
 */
export async function runPageScripts(pageName) {
  const initializer = pageInitializers[pageName];
  if (!initializer) return;

  try {
    await initializer();
  } catch (error) {
    console.error(`Failed to initialize page "${pageName}":`, error);
  }
}

