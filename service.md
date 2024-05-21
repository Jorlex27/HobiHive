# Dokumentasi Service

Direktori `/services` digunakan untuk menyimpan logika bisnis dari aplikasi. Logika bisnis ini mencakup aturan dan operasi utama yang menentukan bagaimana data diproses dan ditransformasikan. Dengan memisahkan logika bisnis dari kontroler dan model, kita dapat membuat kode lebih modular, mudah dipelihara, dan dapat diuji.

## Daftar Service dan Fungsinya

### 1. User Service (`userService.js`)
#### Fungsi:
- Mengelola operasi terkait pengguna seperti pendaftaran, login, pengambilan data pengguna, dan pembaruan profil pengguna.

#### API:
```javascript
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Model User

// Fungsi untuk mendaftarkan pengguna baru
async function registerUser(username, email, password, fullName, birthDate) {
  // Cek apakah email sudah terdaftar
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buat pengguna baru
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    nama_lengkap: fullName,
    tanggal_lahir: birthDate
  });

  return newUser;
}

// Fungsi untuk login pengguna
async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser
};


##### Api Community

const Community = require('../models/community'); // Model Community

// Fungsi untuk membuat komunitas baru
async function createCommunity(name, description, image) {
  const newCommunity = await Community.create({
    nama: name,
    deskripsi: description,
    gambar: image,
    tanggal_dibuat: new Date()
  });

  return newCommunity;
}

// Fungsi untuk mendapatkan semua komunitas
async function getAllCommunities() {
  const communities = await Community.findAll();
  return communities;
}

module.exports = {
  createCommunity,
  getAllCommunities
};


##### Api Post

const Post = require('../models/post'); // Model Post

// Fungsi untuk membuat postingan baru
async function createPost(userId, communityId, title, content) {
  const newPost = await Post.create({
    id_pengguna: userId,
    id_komunitas: communityId,
    judul: title,
    konten: content,
    tanggal_posting: new Date()
  });

  return newPost;
}

// Fungsi untuk mendapatkan semua postingan dalam komunitas
async function getPostsByCommunity(communityId) {
  const posts = await Post.findAll({ where: { id_komunitas: communityId } });
  return posts;
}

module.exports = {
  createPost,
  getPostsByCommunity
};



##### Api Comment

const Comment = require('../models/comment'); // Model Comment

// Fungsi untuk membuat komentar baru
async function createComment(userId, postId, content) {
  const newComment = await Comment.create({
    id_pengguna: userId,
    id_postingan: postId,
    konten: content,
    tanggal_komentar: new Date()
  });

  return newComment;
}

// Fungsi untuk mendapatkan semua komentar pada postingan
async function getCommentsByPost(postId) {
  const comments = await Comment.findAll({ where: { id_postingan: postId } });
  return comments;
}

module.exports = {
  createComment,
  getCommentsByPost
};


######## contoh di controller

const { registerUser, loginUser } = require('../services/userService');

// Handler untuk registrasi
async function register(req, res, next) {
  try {
    const { username, email, password, fullName, birthDate } = req.body;
    const newUser = await registerUser(username, email, password, fullName, birthDate);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

// Handler untuk login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login
};


Dokumentasi ini memberikan penjelasan tentang tujuan dan penggunaan dari setiap service dalam proyek Anda. Ini akan membantu pengembang lain yang mungkin bekerja dengan Anda untuk memahami struktur dan logika bisnis dari aplikasi yang Anda bangun.