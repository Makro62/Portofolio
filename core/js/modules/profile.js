/* ===========================================
   PROFILE MODULE
   Handles profile page rendering & events
   =========================================== */

import { getCurrentUser } from './auth.js'
import { getOrderHistory, getWishlist } from '../state.js'
import { escapeHtml, isValidImageUrl } from '../utils/escapeHtml.js'

let profileEventsBound = false

/**
 * Initialize profile page after markup injected
 */
export async function initializeProfilePage() {
  const user = getCurrentUser()
  if (!user) return

  updateProfileInfo(user)
  renderProfileOrders()
  renderProfileWishlist()
  bindProfileEvents()
  refreshIcons()
}

function updateProfileInfo(user) {
  // Mencoba beberapa ID yang mungkin ada di HTML
  const profileName =
    document.getElementById('profile-name') ||
    document.getElementById('user-name')
  const profileEmail =
    document.getElementById('profile-email') ||
    document.getElementById('user-email')
  const settingsName = document.querySelector(
    '#settings-tab input[type="text"]'
  )
  const settingsEmail = document.querySelector(
    '#settings-tab input[type="email"]'
  )

  if (profileName) profileName.textContent = user.name
  if (profileEmail) profileEmail.textContent = user.email
  if (settingsName) settingsName.value = user.name
  if (settingsEmail) settingsEmail.value = user.email
}

function renderProfileOrders() {
  const ordersEl = document.getElementById('orders-tab')
  if (!ordersEl) return

  const orderHistory = getOrderHistory()
  ordersEl.querySelectorAll('.order-card').forEach(card => card.remove())

  orderHistory.forEach(order => {
    const orderCard = document.createElement('div')
    orderCard.className = 'order-card'

    orderCard.innerHTML = `
      <div class="order-header">
        <div>
          <h3>Order #${order.id}</h3>
          <p class="order-date">Placed on ${order.date}</p>
        </div>
        <span class="order-status ${order.status}">
          ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      <div class="order-items">
        ${order.items
          .map(item => {
            const safeImage = isValidImageUrl(item.image)
              ? item.image
              : 'images/placeholder.jpg'
            const safeName = escapeHtml(item.name)
            return `
          <div class="order-item">
            <img src="${safeImage}" alt="${safeName}">
            <div class="order-item-info">
              <h4>${safeName}</h4>
              <p>Qty: ${item.quantity} × $${item.priceAtPurchase.toFixed(2)}</p>
            </div>
            <p class="order-item-price">$${(item.quantity * item.priceAtPurchase).toFixed(2)}</p>
          </div>
        `
          })
          .join('')}
      </div>
      <div class="order-footer">
        <div class="order-total">
          <span>Total:</span>
          <span class="order-total-price">
            $${order.items.reduce((sum, item) => sum + item.quantity * item.priceAtPurchase, 0).toFixed(2)}
          </span>
        </div>
        <button class="btn-secondary">Order Again</button>
      </div>
    `
    ordersEl.appendChild(orderCard)
  })
}

function renderProfileWishlist() {
  const wishlistEl = document.querySelector('#wishlist-tab .wishlist-grid')
  if (!wishlistEl) return

  const wishlist = getWishlist()
  if (wishlist.length === 0) {
    wishlistEl.innerHTML = '<p>No items in your wishlist yet.</p>'
    return
  }

  wishlistEl.innerHTML = wishlist
    .map(item => {
      const safeImage = isValidImageUrl(item.image)
        ? item.image
        : 'images/placeholder.jpg'
      const safeName = escapeHtml(item.name)
      const priceLabel =
        typeof item.price === 'number'
          ? item.price.toFixed(2)
          : escapeHtml(String(item.price))
      return `
    <div class="wishlist-item">
      <img src="${safeImage}" alt="${safeName}">
      <h3>${safeName}</h3>
      <p class="wishlist-price">$${priceLabel}</p>
      <button class="btn-add-cart">Add to Cart</button>
    </div>
  `
    })
    .join('')
}

function bindProfileEvents() {
  if (profileEventsBound) return

  document.addEventListener('click', handleTabNavigation)
  profileEventsBound = true
}

function handleTabNavigation(event) {
  const tabLink = event.target.closest('.profile-nav-item')
  if (!tabLink) return

  event.preventDefault()
  const tabName = tabLink.dataset.tab

  document.querySelectorAll('.profile-nav-item').forEach(item => {
    item.classList.toggle('active', item === tabLink)
  })

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}-tab`)
  })
}

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons()
  }
}
