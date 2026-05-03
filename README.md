# 🍎 FreshFruits - Fresh Fruits E-Commerce

Modern, responsive e-commerce website untuk penjualan buah-buahan segar dengan design system yang comprehensive, dark mode support, dan accessibility terbaik.

---

## 🚀 Quick Start

### Cara Menjalankan Proyek

**📖 Baca dulu:** **[QUICK_START.md](QUICK_START.md)** - Panduan cepat menjalankan proyek

**Ringkasan:**

1. Install VS Code + Live Server extension
2. Buka folder `Portofolio` di VS Code
3. Click "Go Live" di pojok kanan bawah
4. Browser otomatis buka di `http://localhost:5500`

⚠️ **PENTING**: Project ini menggunakan ES6 modules, HARUS dijalankan melalui server (Live Server / http-server). JANGAN double-click `index.html`!

---

## 📁 Struktur Proyek

```
Portofolio/
├── index.html           # Entry point
├── home/                # Home page (HTML + CSS + JS)
├── shop/                # Shop page (HTML + CSS + JS)
├── about/               # About page (HTML + CSS + JS)
├── contact/             # Contact page (HTML + CSS + JS)
├── login/               # Login page (HTML + CSS + JS)
├── profile/             # Profile page (HTML + CSS + JS)
├── product-detail/      # Product detail page (HTML + CSS + JS)
└── core/                # General/Shared code
    ├── css/             # Global CSS
    │   ├── base/        # Foundation (variables, reset, typography)
    │   ├── layout/      # Header, Footer
    │   └── components/  # Buttons, Cart, Products
    ├── js/              # Global JavaScript
    │   ├── modules/     # Auth, Dark Mode, Events
    │   └── data/        # Product catalog
    ├── components/      # Shared JS components (Cart, Products)
    └── shared/          # Header & Footer HTML templates
```

**📖 Detail struktur:** [STRUCTURE.md](STRUCTURE.md)

---

## ✨ Fitur Utama

### 🛒 E-Commerce

- Shopping cart dengan add/remove items
- Product filtering & search
- Product detail modal
- Flash sale & deals
- Smooth animations & micro-interactions

### 🎨 Design System

- **Inspired by**: Tokopedia, Netflix, Blibli
- Modern, clean, dan professional
- Consistent spacing (8px base unit)
- Semantic color system
- Typography scale yang jelas

### 🌓 Dark Mode

- Auto-detect system preference
- Toggle manual dengan persistent storage
- Smooth transition animations
- Consistent colors di semua theme

### ♿ Accessibility (A11y)

- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation
- Focus indicators yang jelas
- High contrast mode support
- Reduced motion support

### 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1200px
- Touch-friendly pada mobile
- Optimized untuk semua device

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS (Custom Properties, Flexbox, Grid)
- **Architecture**: SPA (Single Page Application) dengan custom router
- **Icons**: Lucide Icons + Bootstrap Icons
- **State Management**: Custom state management
- **Module System**: ES6 Modules

---

## 📚 Dokumentasi

- **[QUICK_START.md](QUICK_START.md)** - Panduan cepat menjalankan proyek
- **[HOW_TO_RUN.md](HOW_TO_RUN.md)** - Dokumentasi lengkap cara menjalankan
- **[STRUCTURE.md](STRUCTURE.md)** - Penjelasan struktur folder & import paths
- **[CHANGELOG.md](CHANGELOG.md)** - Catatan perubahan versi
- **[IMPROVEMENTS_LOG.md](IMPROVEMENTS_LOG.md)** - Log perbaikan & improvements

---

## 📦 Cara Menambah Halaman Baru

1. **Buat folder baru:**

   ```bash
   mkdir new-page
   ```

2. **Buat 3 file:**
   - `new-page.html` - Template HTML
   - `new-page.css` - Styling khusus
   - `new-page.js` - Logic khusus

3. **Update `core/css/main.css`:**

   ```css
   @import url('../../new-page/new-page.css');
   ```

4. **Update routing** di `core/js/router.js` jika perlu

---

## 🎯 Design Philosophy

### Modular & Scalable

- Setiap halaman isolated dalam folder sendiri
- General code di `core/`
- Easy to add/remove features

### Performance First

- Lazy loading untuk page-specific code
- Optimized CSS dengan minimal duplication
- Efficient state management

### Developer Experience

- Clear folder structure
- Consistent naming conventions
- Well-documented code
- Easy to understand & maintain

---

## 🐛 Troubleshooting

### Problem: "Failed to load module script"

**Solusi**: Pastikan menggunakan Live Server, JANGAN double-click HTML

### Problem: Page blank

**Solusi**:

1. Buka Console (F12)
2. Check error messages
3. Pastikan struktur folder benar

### Problem: Live Server tidak jalan

**Solusi**:

1. Check extension Live Server terinstall
2. Restart VS Code
3. Pastikan buka FOLDER bukan file

**Lihat troubleshooting lengkap:** [HOW_TO_RUN.md](HOW_TO_RUN.md#troubleshooting)

---

## 📊 Statistics

- **Pages**: 7 (Home, Shop, About, Contact, Login, Profile, Product Detail)
- **CSS Variables**: 100+ custom properties
- **Components**: 10+ reusable components
- **Accessibility Score**: WCAG 2.1 AA
- **Performance**: Optimized dengan lazy loading

---

## 🔄 Version History

**Current Version**: 2.0.1

**Changes (v2.0.1)**:

- ✅ Fixed unclickable buttons pada cart quantity controls (Type Casting ID)
- ✅ Fixed Header position (Sticky-top stabilization)
- ✅ Added safety wrapper untuk search navigation

**Major Changes (v2.0.0)**:

- ✅ Restructure folder ke feature-based organization
- ✅ Fixed cart animation (slide dari kanan ke kiri)
- ✅ Improved module loading & imports
- ✅ Better documentation

**See full changelog:** [CHANGELOG.md](CHANGELOG.md)

---

## 👥 Contributing

Jika ingin contribute:

1. Follow struktur folder yang ada
2. Gunakan CSS variables (jangan hardcode values)
3. Tulis komentar dalam Bahasa Indonesia
4. Test di multiple browsers
5. Ensure accessibility compliance

---

## 📝 License

MIT License - Feel free to use for personal or commercial projects

---

## 🙏 Credits

- **Design Inspiration**: Tokopedia, Netflix, Blibli
- **Icons**: Lucide Icons, Bootstrap Icons
- **Fonts**: System fonts (Inter, SF Pro, Segoe UI)

---

## 📞 Support

Jika ada pertanyaan atau issue:

1. Check documentation di folder ini
2. Check console browser (F12) untuk error details
3. Ensure struktur folder sesuai dengan [STRUCTURE.md](STRUCTURE.md)

---

**Made with ❤️ for healthy living**

**Last Updated**: November 23, 2025
