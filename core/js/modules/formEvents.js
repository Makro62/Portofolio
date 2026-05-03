/* ===========================================
   FORM EVENTS MODULE
   Form-related event handlers
   =========================================== */

import { login } from './auth.js'
import { loadPage } from '../router.js'
import { toast } from '../utils/toast.js'

export function setupForms() {
  document.addEventListener('submit', e => {
    if (e.target.id === 'contact-form') {
      e.preventDefault()
      toast.success('Terima kasih atas pesan Anda! Kami akan segera merespons.')
      e.target.reset()
    }
    if (e.target.id === 'newsletter-form') {
      e.preventDefault()
      const email = e.target.querySelector('input[type="email"]')?.value
      toast.success(
        `Terima kasih telah berlangganan! Kami akan mengirim update ke ${email}`
      )
      e.target.reset()
    }
    if (e.target.id === 'login-form') {
      e.preventDefault()
      handleLogin(e.target)
    }
  })
  document.addEventListener('click', e => {
    if (e.target.closest('#toggle-password')) {
      togglePasswordVisibility()
    }
    if (e.target.closest('#logout-btn')) {
      handleLogout()
    }
  })
}

function handleLogin(form) {
  const username = form.querySelector('#username')?.value
  const password = form.querySelector('#password')?.value
  const errorMessage = document.getElementById('error-message')
  if (!username || !password) {
    toast.error('Silakan lengkapi username dan password')
    return
  }
  const result = login(username, password)
  if (result.success) {
    errorMessage?.classList.add('hidden')
    toast.success('Login berhasil! Selamat datang kembali.')
    setTimeout(() => loadPage('profile'), 1000)
  } else {
    errorMessage?.classList.remove('hidden')
    toast.error('Username atau password salah')
  }
}

async function handleLogout() {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    try {
      const authModule = await import('./auth.js')
      authModule.logout()
      toast.success('Anda telah logout')
      loadPage('home')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Gagal logout. Silakan coba lagi.')
    }
  }
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password')
  const toggleBtn = document.getElementById('toggle-password')
  if (!passwordInput || !toggleBtn) return
  const icon = toggleBtn.querySelector('i')
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'
    icon?.setAttribute('data-lucide', 'eye-off')
  } else {
    passwordInput.type = 'password'
    icon?.setAttribute('data-lucide', 'eye')
  }
  if (window.lucide) {
    lucide.createIcons()
  }
}
