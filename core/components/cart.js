/* ===========================================
   CART MODULE
   Mengelola fungsi-fungsi shopping cart
   =========================================== */

import {
  getCart,
  addToCart as addToCartState,
  removeFromCart as removeFromCartState,
  updateCartItem,
} from '../js/state.js'
import { fruits } from '../js/data/products.js'
import { toast } from '../js/utils/toast.js'
import {
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODES,
  DELIVERY_FEE,
  PAID_DELIVERY_FEE,
} from '../js/constants.js'

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidImageUrl(url) {
  return (
    typeof url === 'string' && (url.startsWith('http') || url.startsWith('/'))
  )
}

export function removeFromCart(productId) {
  removeFromCartState(productId)
  updateCartDisplay()
}

export function addToCart(productId) {
  const id = typeof productId === 'string' ? parseInt(productId) : productId
  const fruit = fruits.find(f => f.id === id)
  if (!fruit) return
  const cart = getCart()
  const existing = cart.find(item => item.id === id)
  if (existing) {
    updateCartItem(id, existing.quantity + 1)
  } else {
    addToCartState({ ...fruit, quantity: 1 })
  }
  updateCartDisplay()
  showCartAddAnimation(id)
  toast.success(`${fruit.name} ditambahkan ke keranjang!`, 2000)
}

function showCartAddAnimation(productId) {
  const cartBtn = document.getElementById('cart-btn')
  if (!cartBtn) return
  const productEl = document.querySelector(`[data-product-id="${productId}"]`)
  let startX, startY
  if (productEl) {
    const rect = productEl.getBoundingClientRect()
    startX = rect.left + rect.width / 2
    startY = rect.top + rect.height / 2
  } else {
    startX = window.innerWidth / 2
    startY = window.innerHeight / 2
  }
  const cartRect = cartBtn.getBoundingClientRect()
  const endX = cartRect.left + cartRect.width / 2
  const endY = cartRect.top + cartRect.height / 2
  const animationEl = document.createElement('div')
  animationEl.className = 'cart-add-animation'
  animationEl.textContent = '+1'
  animationEl.style.left = `${startX}px`
  animationEl.style.top = `${startY}px`
  document.body.appendChild(animationEl)
  void animationEl.offsetWidth
  animationEl.style.transition =
    'left 0.6s cubic-bezier(0.22, 0.61, 0.36, 1), top 0.6s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.3s'
  animationEl.style.left = `${endX}px`
  animationEl.style.top = `${endY}px`
  animationEl.style.opacity = '0'
  setTimeout(() => {
    animationEl.remove()
  }, 800)
}

export function increaseQuantity(productId) {
  const id = typeof productId === 'string' ? parseInt(productId) : productId
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (item) {
    updateCartItem(id, item.quantity + 1)
    updateCartDisplay()
  }
}

export function decreaseQuantity(productId) {
  const id = typeof productId === 'string' ? parseInt(productId) : productId
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (!item) return
  if (item.quantity > 1) {
    updateCartItem(id, item.quantity - 1)
    updateCartDisplay()
  } else {
    removeFromCart(id)
  }
}

let activePromoCode = null

export function calculateTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function calculateDiscount() {
  if (!activePromoCode) return 0
  const subtotal = calculateTotal()
  switch (activePromoCode.code) {
    case 'WELCOME10':
      return subtotal * 0.1
    case 'SAVE20':
      return subtotal * 0.2
    case 'DISCOUNT50':
      return subtotal * 0.5
    case 'FREE50':
      return subtotal >= 50 ? PAID_DELIVERY_FEE : 0
    default:
      return 0
  }
}

export function applyPromoCode(code) {
  const upperCode = code.toUpperCase().trim()
  if (PROMO_CODES[upperCode]) {
    activePromoCode = PROMO_CODES[upperCode]
    updateCartDisplay()
    return true
  }
  return false
}

export function removePromoCode() {
  activePromoCode = null
  updateCartDisplay()
}

export function getTotalItems() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

export function initCartDisplay() {
  const overlay = document.getElementById('cart-overlay')
  if (overlay) {
    overlay.classList.add('hidden')
    overlay.setAttribute('aria-hidden', 'true')
  }
  const closeBtn = document.getElementById('close-cart')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleCart(false))
  }
  const continueBtn = document.getElementById('continue-shopping')
  if (continueBtn) {
    continueBtn.addEventListener('click', () => toggleCart(false))
  }
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) toggleCart(false)
    })
  }
  updateCartDisplay()
}

export function updateCartDisplay() {
  const cart = getCart()
  const count = getTotalItems()
  const subtotal = calculateTotal()
  const discount = calculateDiscount()
  const deliveryFee =
    subtotal >= FREE_SHIPPING_THRESHOLD ? DELIVERY_FEE : PAID_DELIVERY_FEE
  const total = subtotal - discount + deliveryFee
  const cartCountEl = document.getElementById('cart-count')
  const cartTotalItemsEl = document.getElementById('cart-total-items')
  const checkoutBtn = document.getElementById('checkout-btn')
  if (cartCountEl) cartCountEl.textContent = count
  if (cartTotalItemsEl) {
    cartTotalItemsEl.textContent = count === 0 ? '0 item' : `${count} item`
  }
  if (checkoutBtn) {
    if (count === 0) {
      checkoutBtn.disabled = true
      checkoutBtn.setAttribute('aria-label', 'Checkout (keranjang kosong)')
    } else {
      checkoutBtn.disabled = false
      checkoutBtn.setAttribute('aria-label', `Checkout ${count} item`)
    }
  }
  const cartBtn = document.getElementById('cart-btn')
  if (cartBtn) {
    cartBtn.setAttribute('aria-label', `Keranjang belanja: ${count} item`)
  }
  const subtotalEl = document.getElementById('cart-subtotal')
  const discountEl = document.getElementById('cart-discount')
  const deliveryEl = document.getElementById('cart-delivery')
  const totalEl = document.getElementById('cart-total')
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`
  if (discountEl) {
    if (discount > 0) {
      discountEl.closest('.summary-row').style.display = 'flex'
      discountEl.textContent = `-$${discount.toFixed(2)}`
    } else {
      discountEl.closest('.summary-row').style.display = 'none'
    }
  }
  if (deliveryEl)
    deliveryEl.textContent =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 'GRATIS' : `$${PAID_DELIVERY_FEE}`
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`
  updatePromoCodeUI()
  const itemsEl = document.getElementById('cart-items')
  if (!itemsEl) return
  if (count === 0) {
    itemsEl.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">
          <i data-lucide="shopping-cart"></i>
        </div>
        <h3>Keranjang Anda kosong</h3>
        <p>Tambahkan produk untuk mulai belanja</p>
        <button class="btn-primary empty-cart-btn" data-page="shop">Mulai Belanja</button>
      </div>
    `
  } else {
    itemsEl.innerHTML = cart
      .map(item => {
        const safeName = escapeHtml(item.name)
        const safeImage = isValidImageUrl(item.image)
          ? item.image
          : '/images/placeholder.jpg'
        return `
        <div class="cart-item" data-cart-item="${item.id}">
          <div class="cart-item-image">
            <img src="${safeImage}" alt="${safeName}" loading="lazy">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${safeName}</div>
            <div class="cart-item-details">
              <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
              <div class="quantity-controls">
                <button class="quantity-btn dec" data-id="${item.id}" aria-label="Kurangi jumlah ${safeName}">−</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn inc" data-id="${item.id}" aria-label="Tambah jumlah ${safeName}">+</button>
              </div>
            </div>
          </div>
          <button class="cart-item-delete" data-id="${item.id}" aria-label="Hapus ${safeName} dari keranjang">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `
      })
      .join('')
  }
  updateShippingProgress(subtotal)
  if (window.lucide) {
    lucide.createIcons()
  }
}

function updatePromoCodeUI() {
  const promoInput = document.getElementById('promo-code-input')
  const promoApplied = document.getElementById('promo-applied')
  const promoInputWrapper = document.getElementById('promo-input-wrapper')
  if (activePromoCode) {
    if (promoInputWrapper) promoInputWrapper.style.display = 'none'
    if (promoApplied) {
      promoApplied.style.display = 'flex'
      const promoText = promoApplied.querySelector('.promo-code-text')
      if (promoText) {
        promoText.textContent = `${activePromoCode.code} - ${activePromoCode.description}`
      }
    }
  } else {
    if (promoInputWrapper) promoInputWrapper.style.display = 'flex'
    if (promoApplied) promoApplied.style.display = 'none'
    if (promoInput) promoInput.value = ''
  }
}

function updateShippingProgress(subtotal) {
  const progressEl = document.getElementById('cart-progress')
  if (!progressEl) return
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  if (remaining > 0) {
    progressEl.innerHTML = `
      <div class="cart-progress-text">
        <i data-lucide="truck"></i>
        <span>Belanja <strong>$${remaining.toFixed(2)}</strong> lagi untuk <strong>GRATIS ONGKIR!</strong></span>
      </div>
    `
    progressEl.style.display = 'block'
  } else {
    progressEl.innerHTML = `
      <div class="cart-progress-text">
        <i data-lucide="check-circle"></i>
        <span>Selamat! Anda mendapat <strong>GRATIS ONGKIR</strong>! 🎉</span>
      </div>
    `
    progressEl.style.display = 'block'
  }
}

export function toggleCart(show) {
  const overlay = document.getElementById('cart-overlay')
  if (!overlay) return
  if (show) {
    overlay.classList.remove('hidden')
    overlay.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    updateCartDisplay()
    setTimeout(() => {
      const closeBtn = document.getElementById('close-cart')
      if (closeBtn) closeBtn.focus()
    }, 100)
  } else {
    overlay.classList.add('hidden')
    overlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    const cartBtn = document.getElementById('cart-btn')
    if (cartBtn) cartBtn.focus()
  }
}
