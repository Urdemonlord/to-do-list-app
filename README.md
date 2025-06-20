# 📝 Aplikasi Manajemen Tugas (To-Do List)

Aplikasi manajemen tugas modern yang dibangun dengan React Native dan Expo, menggunakan bahasa Indonesia sebagai antarmuka utama.

## ✨ Fitur Utama

### 🏠 Halaman Beranda
- Dashboard dengan statistik tugas harian
- Kartu proyek dengan progress visual
- Daftar tugas terbaru dengan status
- Navigasi cepat ke semua fitur

### ✅ Manajemen Tugas
- Daftar tugas dengan filter (Semua, Sedang Berlangsung, Selesai)
- Tambah tugas baru dengan form lengkap
- Detail tugas dengan informasi komprehensif
- Status tugas dengan indikator visual
- Prioritas tugas (Tinggi, Sedang, Rendah)

### 📁 Manajemen Proyek
- Kartu proyek dengan gradient warna
- Progress tracking untuk setiap proyek
- Statistik proyek (Total, Selesai, Berlangsung)
- Form pembuatan proyek dengan kategori

### 👤 Profil Pengguna
- Informasi profil pengguna
- Pengaturan aplikasi (Notifikasi, Mode Gelap, Bahasa)
- Statistik pencapaian pengguna
- Menu logout dengan konfirmasi

## 🛠 Teknologi yang Digunakan

- **React Native** - Framework mobile cross-platform
- **Expo** - Platform development dan deployment
- **TypeScript** - Type safety dan developer experience
- **Expo Router** - File-based routing
- **Lucide React Native** - Icon library
- **Expo Linear Gradient** - Gradient components
- **Inter Font** - Typography
- **React Native SVG** - SVG support

## 📱 Screenshots

```
🏠 Home Screen        ✅ Tasks Screen       📁 Projects Screen    👤 Profile Screen
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ Selamat Pagi!   │   │ Tugas Hari Ini │   │ Proyek          │   │ Livia Vaccaro   │
│ Livia Vaccaro   │   │ [Filter Tabs]   │   │ [Stats Cards]   │   │ [Profile Info]  │
│                 │   │                 │   │                 │   │                 │
│ [Stats Cards]   │   │ [Task List]     │   │ [Project Grid]  │   │ [Settings Menu] │
│ [Project Cards] │   │                 │   │                 │   │                 │
│ [Recent Tasks]  │   │ [Add Button]    │   │ [Add Project]   │   │ [Logout Button] │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js (v16 atau lebih baru)
- npm atau yarn
- Expo CLI
- Expo Go app (untuk testing di device)

### Instalasi
```bash
# Clone repository
git clone <repository-url>
cd to-do-list-app

# Install dependencies
npm install

# Start development server
npx expo start
```

### Testing
```bash
# Scan QR code dengan Expo Go app
# Atau tekan 'w' untuk web preview
# Atau tekan 'a' untuk Android emulator
# Atau tekan 'i' untuk iOS simulator
```

## 📂 Struktur Proyek

```
to-do-list-app/
├── app/                      # Expo Router pages
│   ├── (tabs)/              # Tab navigation pages
│   │   ├── index.tsx        # Home screen
│   │   ├── tasks.tsx        # Tasks management
│   │   ├── projects.tsx     # Projects management
│   │   ├── profile.tsx      # User profile
│   │   └── _layout.tsx      # Tab layout
│   ├── add-project.tsx      # Add project form
│   ├── add-task.tsx         # Add task form
│   ├── task-detail.tsx      # Task detail view
│   ├── +not-found.tsx       # 404 page
│   ├── index.tsx            # Welcome screen
│   └── _layout.tsx          # Root layout
├── assets/                   # Static assets
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── hooks/                    # Custom React hooks
│   └── useFrameworkReady.ts
├── app.json                  # Expo configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── metro.config.js          # Metro bundler config
```

## 🎨 Design System

### Warna Utama
- **Primary**: `#5f33e1` (Purple)
- **Success**: `#4ecdc4` (Teal)
- **Warning**: `#ffa726` (Orange)
- **Danger**: `#ff6b6b` (Red)
- **Background**: `#f8f9fa` (Light Gray)
- **Surface**: `#ffffff` (White)
- **Text**: `#24252c` (Dark Gray)

### Typography
- **Font Family**: Inter (Regular, Medium, SemiBold, Bold)
- **Sizes**: 11px - 32px
- **Line Heights**: Optimal untuk keterbacaan

### Spacing
- **Base Unit**: 4px
- **Standard Gaps**: 8px, 12px, 16px, 20px, 24px, 32px
- **Border Radius**: 8px, 12px, 16px, 20px, 24px

## 📋 Fitur yang Dapat Dikembangkan

### 🔄 Integrasi Data
- [ ] Backend API integration
- [ ] Local storage dengan AsyncStorage
- [ ] Offline-first architecture
- [ ] Data synchronization

### 🔔 Notifikasi
- [ ] Push notifications
- [ ] Reminder untuk tugas
- [ ] Achievement notifications

### 🌙 Tema
- [ ] Dark mode implementation
- [ ] Custom theme colors
- [ ] Adaptive theme based on system

### 🔍 Pencarian & Filter
- [ ] Search functionality
- [ ] Advanced filtering
- [ ] Sorting options
- [ ] Category tags

### 📊 Analytics
- [ ] Progress tracking
- [ ] Productivity insights
- [ ] Time tracking
- [ ] Reports dan charts

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail.

## 📞 Kontak

- **Developer**: [Hasrinata Arya Afendi]
- **Email**: [hasrinata@gmail.com]
- **GitHub**: [Urdemonlord]

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev) untuk platform yang luar biasa
- [Lucide](https://lucide.dev) untuk icon set yang indah
- [Inter Font](https://rsms.me/inter/) untuk typography yang sempurna
- React Native Community untuk dokumentasi dan dukungan

---

**Happy Coding! 🚀**
