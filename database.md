# Struktur Database

## Tabel Pengguna (Users)

| Nama Kolom     | Tipe Data     | Keterangan                         |
|----------------|---------------|------------------------------------|
| id             | INTEGER       | Primary key                        |
| username       | VARCHAR       | Nama pengguna                      |
| email          | VARCHAR       | Alamat email                       |
| password       | VARCHAR       | Kata sandi (hashed)                |
| nama_lengkap   | VARCHAR       | Nama lengkap pengguna              |
| tanggal_lahir  | DATE          | Tanggal lahir pengguna             |
| bio            | TEXT          | Deskripsi singkat tentang pengguna |
| lokasi         | VARCHAR       | Lokasi pengguna                    |
| gambar_profil  | VARCHAR       | Path ke gambar profil              |

## Tabel Komunitas (Communities)

| Nama Kolom     | Tipe Data     | Keterangan                         |
|----------------|---------------|------------------------------------|
| id             | INTEGER       | Primary key                        |
| nama           | VARCHAR       | Nama komunitas                     |
| deskripsi      | TEXT          | Deskripsi tentang komunitas        |
| gambar         | VARCHAR       | Path ke gambar komunitas           |
| tanggal_dibuat | DATE          | Tanggal pembuatan komunitas        |

## Tabel Anggota Komunitas (CommunityMembers)

| Nama Kolom     | Tipe Data     | Keterangan                                    |
|----------------|---------------|-----------------------------------------------|
| id             | INTEGER       | Primary key                                   |
| id_pengguna    | INTEGER       | Foreign key ke tabel Pengguna                 |
| id_komunitas   | INTEGER       | Foreign key ke tabel Komunitas                |
| tanggal_join   | DATE          | Tanggal pengguna bergabung dengan komunitas   |
| peran          | VARCHAR       | Peran pengguna dalam komunitas                |

## Tabel Postingan (Posts)

| Nama Kolom     | Tipe Data     | Keterangan                         |
|----------------|---------------|------------------------------------|
| id             | INTEGER       | Primary key                        |
| id_pengguna    | INTEGER       | Foreign key ke tabel Pengguna      |
| id_komunitas   | INTEGER       | Foreign key ke tabel Komunitas     |
| judul          | VARCHAR       | Judul postingan                    |
| konten         | TEXT          | Konten postingan (teks atau markdown) |
| tanggal_posting| DATE          | Tanggal postingan dibuat           |

## Tabel Komentar (Comments)

| Nama Kolom        | Tipe Data     | Keterangan                         |
|-------------------|---------------|------------------------------------|
| id                | INTEGER       | Primary key                        |
| id_pengguna       | INTEGER       | Foreign key ke tabel Pengguna      |
| id_postingan      | INTEGER       | Foreign key ke tabel Postingan     |
| konten            | TEXT          | Konten komentar                    |
| tanggal_komentar  | DATE          | Tanggal komentar dibuat            |

## Tabel Like (Likes)

| Nama Kolom     | Tipe Data     | Keterangan                         |
|----------------|---------------|------------------------------------|
| id             | INTEGER       | Primary key                        |
| id_pengguna    | INTEGER       | Foreign key ke tabel Pengguna      |
| id_postingan   | INTEGER       | Foreign key ke tabel Postingan     |
| tanggal_like   | DATE          | Tanggal like dibuat                |
