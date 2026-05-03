/* ===========================================
   MAIN APPLICATION FILE
   Entry point for the application
   =========================================== */

import { initLayout, loadPage } from './router.js'
import { setupEventListeners } from './modules/events.js'
import { initAuth } from './modules/auth.js'
import { initDarkMode } from './modules/darkmode.js'
import { initCartDisplay } from '../components/cart.js'
import { initSearchAutocomplete } from './utils/searchAutocomplete.js'
document.addEventListener('DOMContentLoaded', initApp)

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(_registration => {})
        .catch(_error => {})
    })
  }
}

async function initApp() {
  try {
    registerServiceWorker()
    initDarkMode()
    await initLayout()

    const icon = document.getElementById('dark-mode-icon')
    if (icon && window.lucide) {
      const currentTheme =
        document.documentElement.getAttribute('data-theme') || 'light'
      icon.setAttribute('data-lucide', currentTheme === 'dark' ? 'sun' : 'moon')
    }

    initCartDisplay()
    initAuth()
    initSearchAutocomplete()
    await loadPage('home')
    setupEventListeners()
  } catch (error) {
    console.error('App initialization failed:', error)
  }
}
