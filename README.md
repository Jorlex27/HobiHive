# HobiHive

HobiHive adalah aplikasi sosial untuk penggemar hobi dan komunitas yang memungkinkan pengguna untuk terhubung, berbagi, dan berinteraksi berdasarkan minat dan hobi yang sama.

## Struktur Direktori Proyek

- `/config`: Direktori untuk konfigurasi aplikasi.
- `/controllers`: Direktori untuk kontroler aplikasi.
- `/middlewares`: Direktori untuk middleware aplikasi.
- `/models`: Direktori untuk model database.
- `/routes`: Direktori untuk routing aplikasi.
- `/services`: Direktori untuk layanan aplikasi.
- `/public`: Direktori untuk file publik seperti gambar dan stylesheet.
- `/views`: Direktori untuk file view (ejs).
- `app.js`: Berkas utama aplikasi.
- `package.json`: Berkas konfigurasi proyek.
- `README.md`: Dokumentasi proyek.

## Struktur Database

1. Tabel Pengguna (Users)
2. Tabel Komunitas (Communities)
3. Tabel Anggota Komunitas (CommunityMembers)
4. Tabel Postingan (Posts)
5. Tabel Komentar (Comments)
6. Tabel Like (Likes)

## Instalasi Modul

1. Express
   npm install express

2. Sequelize
   npm install sequelize sequelize-cli mysql2

3. Express Validator
   npm install express-validator

4. Bcrypt
   npm install bcrypt

5. Multer
   npm install multer

6. Passport.js
   npm install passport passport-local

7. EJS
   npm install ejs

8. Dotenv
   npm install dotenv

## Penggunaan

1. Clone repositori ini.
2. Buatlah file `.env` berisi konfigurasi untuk koneksi database.
3. Jalankan perintah `npm install` untuk menginstal semua dependensi.
4. Jalankan aplikasi dengan perintah `node app.js` atau `npm start`.
5. Buka aplikasi di browser dengan alamat http://localhost:3000.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan buat pull request dengan perubahan Anda.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).
