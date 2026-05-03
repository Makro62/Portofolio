/* ===========================================
   CONSTANTS MODULE
   Application-wide constants
   =========================================== */

export const FREE_SHIPPING_THRESHOLD = 50
export const DELIVERY_FEE = 0
export const PAID_DELIVERY_FEE = 5

export const PROMO_CODES = {
  WELCOME10: { code: 'WELCOME10', description: '10% OFF' },
  SAVE20: { code: 'SAVE20', description: '20% OFF' },
  DISCOUNT50: { code: 'DISCOUNT50', description: '50% OFF' },
  FREE50: { code: 'FREE50', description: '$5 OFF for orders over $50' },
}

export const STORAGE_KEYS = {
  USER: 'freshfruits_user',
  WISHLIST: 'freshfruits_wishlist',
  CART: 'freshfruits_cart',
}

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}
