/* ===========================================
   NAVIGATION EVENTS MODULE
   Navigation and routing event handlers
   =========================================== */

import { loadPage } from '../router.js'
import { toggleMobileMenu } from '../router.js'

export function handleNavigationClick(e) {
  // Handle data-page navigation
  const pageLink = e.target.closest('[data-page]')
  if (pageLink) {
    e.preventDefault()
    const page = pageLink.dataset.page
    loadPage(page)
    return
  }

  // Handle data-navigate navigation (for breadcrumbs)
  const navigateLink = e.target.closest('[data-navigate]')
  if (navigateLink) {
    e.preventDefault()
    const pagePath = navigateLink.dataset.navigate
    // Extract page name from path (e.g., "/shop" -> "shop")
    const pageName = pagePath.replace('/', '') || 'home'
    loadPage(pageName)
    return
  }

  // Handle category pills
  const categoryPill = e.target.closest('.category-pill')
  if (categoryPill) {
    loadPage('shop')
  }

  // Handle cart button
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
