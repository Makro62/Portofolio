/* ===========================================
   NAVIGATION EVENTS MODULE
   Navigation and routing event handlers
   =========================================== */

import { loadPage } from '../router.js'
import { toggleMobileMenu } from '../router.js'

export function handleNavigationClick(e) {
  const pageLink = e.target.closest('[data-page]')
  if (pageLink) {
    e.preventDefault()
    const page = pageLink.dataset.page
    loadPage(page)
  }

  const categoryPill = e.target.closest('.category-pill')
  if (categoryPill) {
    loadPage('shop')
  }

  const cartBtn = e.target.closest('#cart-btn')
  if (cartBtn) {
    e.preventDefault()
    import('../../components/cart.js').then(cart => cart.toggleCart(true))
  }
}

export function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle')
  const menuClose = document.getElementById('mobile-menu-close')
  const mobileMenu = document.getElementById('mobile-menu')
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu)
  }
  if (menuClose) {
    menuClose.addEventListener('click', toggleMobileMenu)
  }
  if (mobileMenu) {
    mobileMenu.addEventListener('click', event => {
      if (event.target === mobileMenu) {
        toggleMobileMenu()
      }
    })
    mobileMenu.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', toggleMobileMenu)
    })
  }
}
