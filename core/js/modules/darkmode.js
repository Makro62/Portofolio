/* ===========================================
   DARK MODE MODULE
   Menangani toggle dark mode dan preferensi tema
   =========================================== */

const THEME_KEY = 'freshfruits_theme'

export function initDarkMode() {
  const savedTheme = localStorage.getItem(THEME_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    enableDarkMode()
  } else {
    disableDarkMode()
  }
  setupDarkModeToggle()
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (!localStorage.getItem(THEME_KEY)) {
        if (e.matches) {
          enableDarkMode()
        } else {
          disableDarkMode()
        }
      }
    })
}

function enableDarkMode() {
  document.documentElement.setAttribute('data-theme', 'dark')
  localStorage.setItem(THEME_KEY, 'dark')
  updateDarkModeIcon(true)
}

function disableDarkMode() {
  document.documentElement.setAttribute('data-theme', 'light')
  localStorage.setItem(THEME_KEY, 'light')
  updateDarkModeIcon(false)
}

export function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  if (currentTheme === 'dark') {
    disableDarkMode()
  } else {
    enableDarkMode()
  }
}

export function setupDarkModeToggle() {
  const toggleBtn = document.getElementById('dark-mode-toggle')
  if (!toggleBtn) return
  const newToggleBtn = toggleBtn.cloneNode(true)
  toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn)
  newToggleBtn.addEventListener('click', toggleDarkMode)
}

function updateDarkModeIcon(isDark) {
  const icon = document.getElementById('dark-mode-icon')
  if (!icon) return
  if (window.lucide) {
    const newIcon = isDark ? 'sun' : 'moon'
    icon.setAttribute('data-lucide', newIcon)
    const svg = icon.querySelector('svg')
    if (svg) {
      svg.remove()
    }
    lucide.createIcons()
  }
}

export function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
}
