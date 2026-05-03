/* ===========================================
   ROUTER MODULE
   Handles navigation and page loading
   =========================================== */

import { setCurrentPage } from './state.js'
import { updateAuthButton, isLoggedIn } from './modules/auth.js'
import { runPageScripts } from './pages/pageRegistry.js'

async function loadFile(url) {
  try {
    const response = await fetch(url)
    return await response.text()
  } catch (error) {
    console.error('Error loading file:', error)
    return ''
  }
}

export async function loadPage(pageName) {
  if (pageName === 'profile' && !isLoggedIn()) {
    import('./utils/toast.js').then(toast => {
      toast.warning('Silakan login terlebih dahulu untuk mengakses profil.')
    })
    pageName = 'login'
  }
  setCurrentPage(pageName)
  let content = await loadFile(`${pageName}/${pageName}.html`)
  if (!content) {
    content = `
      <div class="container py-5 text-center">
        <h2 class="display-4 fw-bold text-success mb-3">404</h2>
        <h3 class="mb-4">Halaman Tidak Ditemukan</h3>
        <p class="text-muted mb-4">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <button class="btn btn-success btn-lg" data-page="home">Kembali ke Beranda</button>
      </div>`
  }
  const contentEl = document.getElementById('content')
  if (contentEl) {
    contentEl.innerHTML = content
    contentEl.setAttribute('data-page', pageName)
  }
  if (window.lucide) {
    lucide.createIcons()
  }
  await runPageScripts(pageName)
  updateAuthButton()
  updateActiveNavLinks(pageName)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function updateActiveNavLinks(currentPage) {
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}

export async function initLayout() {
  const header = await loadFile('core/shared/header.html')
  const footer = await loadFile('core/shared/footer.html')
  const headerPlaceholder = document.getElementById('header-placeholder')
  const footerPlaceholder = document.getElementById('footer-placeholder')
  if (headerPlaceholder) headerPlaceholder.innerHTML = header
  if (footerPlaceholder) footerPlaceholder.innerHTML = footer
  try {
    const navEvents = await import('./modules/navEvents.js')
    headerPlaceholder.addEventListener('click', navEvents.handleNavigationClick)
    navEvents.setupMobileMenu()
  } catch (error) {
    console.warn('Navigation events module error:', error)
  }
  if (window.lucide) {
    lucide.createIcons()
  }
  try {
    const darkModeModule = await import('./modules/darkmode.js')
    darkModeModule.setupDarkModeToggle()

    const currentTheme =
      document.documentElement.getAttribute('data-theme') || 'light'
    const icon = document.getElementById('dark-mode-icon')
    if (icon && window.lucide) {
      const newIcon = currentTheme === 'dark' ? 'sun' : 'moon'
      icon.setAttribute('data-lucide', newIcon)
      const svg = icon.querySelector('svg')
      if (svg) {
        svg.remove()
      }
      lucide.createIcons()
    }
  } catch (error) {
    console.warn('Dark mode module not available:', error)
  }
}

export function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu')
  if (mobileMenu) {
    const isHidden = mobileMenu.classList.toggle('hidden')
    mobileMenu.setAttribute('aria-hidden', isHidden ? 'true' : 'false')
  }
}
