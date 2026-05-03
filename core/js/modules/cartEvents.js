/* ===========================================
   CART EVENTS MODULE
   Cart-related event handlers
   =========================================== */

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  toggleCart,
  removeFromCart,
  applyPromoCode,
  removePromoCode,
} from '../../components/cart.js'
import { toast } from '../utils/toast.js'

export function handleCartActions(e) {
  if (e.target.closest('.add-to-cart-btn')) {
    const button = e.target.closest('.add-to-cart-btn')
    const productId = parseInt(button.dataset.productId, 10)
    if (!Number.isNaN(productId)) addToCart(productId)
  }
  if (e.target.closest('.dec')) {
    const button = e.target.closest('.dec')
    const productId = parseInt(button.dataset.id, 10)
    if (!Number.isNaN(productId)) decreaseQuantity(productId)
  }
  if (e.target.closest('.inc')) {
    const button = e.target.closest('.inc')
    const productId = parseInt(button.dataset.id, 10)
    if (!Number.isNaN(productId)) increaseQuantity(productId)
  }
  if (e.target.closest('.cart-item-delete')) {
    const button = e.target.closest('.cart-item-delete')
    const productId = parseInt(button.dataset.id, 10)
    if (!Number.isNaN(productId) && confirm('Remove this item from cart?')) {
      removeFromCart(productId)
    }
  }
  if (e.target.closest('.checkout-btn') || e.target.closest('#checkout-btn')) {
    handleCheckout()
  }
  if (e.target.closest('.empty-cart-btn')) {
    toggleCart(false)
  }
}

function handleCheckout() {
  import('../state.js').then(stateModule => {
    const cart = stateModule.getCart()
    if (cart.length === 0) {
      toast.warning('Keranjang Anda kosong!')
      return
    }
    import('./auth.js').then(authModule => {
      if (!authModule.isLoggedIn()) {
        if (confirm('Silakan login terlebih dahulu. Ke halaman login?')) {
          toggleCart(false)
          import('../router.js').then(router => router.loadPage('login'))
        }
      } else {
        toast.info('Melanjutkan ke checkout... (Demo)')
      }
    })
  })
}

export function setupCartToggle() {
  const cartBtn = document.getElementById('cart-btn')
  if (cartBtn) {
    cartBtn.addEventListener('click', () => toggleCart(true))
  }
  const closeCart = document.getElementById('close-cart')
  if (closeCart) {
    closeCart.addEventListener('click', () => toggleCart(false))
  }
  const cartOverlay = document.getElementById('cart-overlay')
  if (cartOverlay) {
    cartOverlay.addEventListener('click', e => {
      if (e.target.id === 'cart-overlay') {
        toggleCart(false)
      }
    })
  }
}

export function handleWishlistActions(e) {
  const wishlistBtn = e.target.closest('.wishlist-btn')
  if (!wishlistBtn) return
  const rawId = wishlistBtn.dataset.productId
  if (rawId === undefined || rawId === '') return

  e.stopPropagation()
  const productId = parseInt(rawId, 10)
  if (Number.isNaN(productId)) return

  import('../state.js').then(stateModule => {
    const isAdded = stateModule.toggleWishlist(productId)
    wishlistBtn.classList.toggle('active', isAdded)
    wishlistBtn.classList.add('animate')
    setTimeout(() => wishlistBtn.classList.remove('animate'), 600)
    if (window.lucide) {
      lucide.createIcons()
    }

    const wishlistBadge = document.getElementById('wishlist-badge')
    if (wishlistBadge) {
      wishlistBadge.textContent = stateModule.getWishlist().length
    }

    if (isAdded) {
      toast.success('Ditambahkan ke wishlist!', 2000)
    } else {
      toast.info('Dihapus dari wishlist', 2000)
    }
  })
}

export function setupPromoCodeHandlers() {
  document.addEventListener('click', e => {
    if (e.target.closest('#btn-apply-promo')) {
      const input = document.getElementById('promo-code-input')
      const code = input?.value?.trim()
      if (code) {
        const success = applyPromoCode(code)
        if (success) {
          toast.success(`Kode promo "${code}" berhasil digunakan!`)
        } else {
          toast.error('Kode promo tidak valid atau sudah kadaluarsa')
        }
      } else {
        toast.warning('Masukkan kode promo terlebih dahulu')
      }
    }
    if (e.target.closest('#btn-remove-promo')) {
      removePromoCode()
      toast.info('Kode promo dihapus')
    }
    if (e.target.closest('#continue-shopping')) {
      toggleCart(false)
    }
  })
  document.addEventListener('keypress', e => {
    if (e.target.id === 'promo-code-input' && e.key === 'Enter') {
      e.preventDefault()
      document.getElementById('btn-apply-promo')?.click()
    }
  })
}
