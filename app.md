# Struktur Proyek HobiHive

Berikut adalah struktur direktori untuk proyek HobiHive.

/hobihive
├── /config
│   └── config.json
├── /controllers
│   ├── userController.js
│   ├── communityController.js
│   ├── postController.js
│   └── commentController.js
├── /middlewares
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── /models
│   ├── user.js
│   ├── community.js
│   ├── post.js
│   ├── comment.js
│   └── index.js
├── /routes
│   ├── userRoutes.js
│   ├── communityRoutes.js
│   ├── postRoutes.js
│   └── commentRoutes.js
├── /services
│   ├── userService.js
│   ├── communityService.js
│   ├── postService.js
│   └── commentService.js
├── /public
│   ├── /images
│   └── /stylesheets
├── /views
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── community.html
│   └── post.html
├── app.js
├── package.json
└── README.md


## Penjelasan Struktur Direktori

### `/config`
- **config.json**: File konfigurasi untuk pengaturan proyek seperti koneksi database dan konfigurasi server.

### `/controllers`
- **userController.js**: Mengelola logika untuk operasi terkait pengguna.
- **communityController.js**: Mengelola logika untuk operasi terkait komunitas.
- **postController.js**: Mengelola logika untuk operasi terkait postingan.
- **commentController.js**: Mengelola logika untuk operasi terkait komentar.

### `/middlewares`
- **authMiddleware.js**: Middleware untuk mengautentikasi permintaan.
- **errorMiddleware.js**: Middleware untuk menangani kesalahan dalam aplikasi.

### `/models`
- **user.js**: Model untuk tabel Pengguna.
- **community.js**: Model untuk tabel Komunitas.
- **post.js**: Model untuk tabel Postingan.
- **comment.js**: Model untuk tabel Komentar.
- **index.js**: Mengelola koneksi dan asosiasi antar model.

### `/routes`
- **userRoutes.js**: Rute untuk operasi terkait pengguna.
- **communityRoutes.js**: Rute untuk operasi terkait komunitas.
- **postRoutes.js**: Rute untuk operasi terkait postingan.
- **commentRoutes.js**: Rute untuk operasi terkait komentar.

### `/services`
- **userService.js**: Logika bisnis untuk operasi terkait pengguna.
- **communityService.js**: Logika bisnis untuk operasi terkait komunitas.
- **postService.js**: Logika bisnis untuk operasi terkait postingan.
- **commentService.js**: Logika bisnis untuk operasi terkait komentar.

### `/public`
- **/images**: Direktori untuk menyimpan gambar publik.
- **/stylesheets**: Direktori untuk menyimpan stylesheet CSS.

### `/views`
- **index.html**: Halaman utama.
- **login.html**: Halaman login.
- **register.html**: Halaman registrasi.
- **community.html**: Halaman komunitas.
- **post.html**: Halaman postingan.

### File Utama
- **app.js**: File utama aplikasi, berisi konfigurasi server dan middleware.
- **package.json**: File konfigurasi npm yang mencantumkan dependensi proyek.
- **README.md**: Dokumentasi proyek.

Dokumentasi ini memberikan gambaran umum tentang struktur direktori dan tujuan masing-masing file dalam proyek HobiHive. Ini akan membantu dalam pengembangan, pemeliharaan, dan kontribusi terhadap proyek ini.
