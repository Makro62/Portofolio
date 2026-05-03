/* ===========================================
   ABOUT PAGE SCRIPT
   Page-specific logic for about page
   =========================================== */

// Initialize about page
export function initAbout() {
  const revealElements = document.querySelectorAll('.about-section, .team-card')

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
    }
  )

  revealElements.forEach(el => {
    el.classList.add('reveal-init') // Gunakan class CSS daripada inline style
    revealObserver.observe(el)
  })
}

// About page initialization handled by router.js
