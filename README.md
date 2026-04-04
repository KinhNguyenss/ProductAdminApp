# 🛍️ ProductAdmin — Ứng dụng Quản lý Sản phẩm

<p align="center">
  <img src="./assets/images/icon.png" width="100" alt="ProductAdmin Logo" />
</p>

<p align="center">
  Ứng dụng di động quản lý sản phẩm đa nền tảng được xây dựng bằng <strong>React Native Expo</strong>,<br/>
  tích hợp <strong>Firebase Firestore</strong> để lưu trữ dữ liệu và <strong>Cloudinary</strong> để quản lý hình ảnh.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54.0-000020?logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/React Native-0.81-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-12.x-FFCA28?logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
</p>

---

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Kiến trúc & Công nghệ](#-kiến-trúc--công-nghệ)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cài đặt & Chạy](#-cài-đặt--chạy)
- [Cấu hình Firebase](#-cấu-hình-firebase)
- [Cấu hình Cloudinary](#-cấu-hình-cloudinary)
- [Luồng hoạt động](#-luồng-hoạt-động)
- [Màn hình & Chức năng](#-màn-hình--chức-năng)

---

## ✨ Tính năng

| Tính năng              | Mô tả                                                             |
| ---------------------- | ----------------------------------------------------------------- |
| 🔐 **Đăng nhập**       | Xác thực bằng Email/Password qua Firebase Auth                    |
| 📦 **Xem danh sách**   | Hiển thị toàn bộ sản phẩm với real-time sync từ Firestore         |
| 🔍 **Tìm kiếm**        | Lọc sản phẩm theo tên hoặc loại ngay trên client                  |
| ➕ **Thêm sản phẩm**   | Nhập thông tin + chụp/chọn ảnh từ thư viện, upload lên Cloudinary |
| ✏️ **Sửa sản phẩm**    | Chỉnh sửa toàn bộ thông tin và thay thế hình ảnh                  |
| 🗑️ **Xóa sản phẩm**    | Xóa vĩnh viễn khỏi Firestore với xác nhận trước                   |
| 🔄 **Pull-to-refresh** | Kéo xuống để làm mới danh sách                                    |
| 🚪 **Đăng xuất**       | Đăng xuất an toàn, xóa session                                    |

---

## 🏗️ Kiến trúc & Công nghệ

```
┌─────────────────────────────────────────────┐
│              React Native Expo              │
│         (iOS / Android / Web)               │
├──────────────┬──────────────┬───────────────┤
│  Expo Router │  expo-image  │ expo-image-   │
│  (File-based │  (Optimized  │ picker        │
│   routing)   │   Images)    │ (Camera/Lib)  │
├──────────────┴──────────────┴───────────────┤
│                  Services                   │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │  Firebase Auth  │  │ Firebase Firestore│  │
│  │  (Xác thực)     │  │  (Database)      │  │
│  └─────────────────┘  └──────────────────┘  │
│            ┌─────────────────┐              │
│            │   Cloudinary    │              │
│            │ (Image Hosting) │              │
│            └─────────────────┘              │
└─────────────────────────────────────────────┘
```

### Stack chính

| Layer             | Công nghệ                                      |
| ----------------- | ---------------------------------------------- |
| **Framework**     | React Native + Expo SDK 54                     |
| **Ngôn ngữ**      | TypeScript (layout) + JavaScript (screens)     |
| **Routing**       | Expo Router (file-based)                       |
| **Database**      | Firebase Firestore (NoSQL, real-time)          |
| **Auth**          | Firebase Authentication (Email/Password)       |
| **Image Hosting** | Cloudinary (upload signed)                     |
| **HTTP Client**   | Axios                                          |
| **State**         | React Hooks (useState, useEffect, useCallback) |
| **Navigation**    | @react-navigation/stack + bottom-tabs          |
| **Storage**       | AsyncStorage (persist auth session)            |

---

## 📁 Cấu trúc thư mục

```
ProductAdminApp/
├── app/                          # Expo Router — Định nghĩa routes
│   ├── _layout.tsx               # Root layout (Stack Navigator)
│   ├── index.tsx                 # Màn hình khởi động → redirect Login
│   ├── product-list.tsx          # Route danh sách sản phẩm
│   ├── add-product.tsx           # Route thêm sản phẩm
│   ├── edit-product.tsx          # Route sửa sản phẩm
│   └── (tabs)/                   # Tab layout (mở rộng)
│
├── src/                          # Source code chính
│   ├── screens/                  # Màn hình UI
│   │   ├── LoginScreen.js        # Màn hình đăng nhập
│   │   ├── ProductListScreen.js  # Danh sách & tìm kiếm sản phẩm
│   │   ├── AddProductScreen.js   # Form thêm sản phẩm + upload ảnh
│   │   └── EditProductScreen.js  # Form sửa sản phẩm + thay ảnh
│   │
│   ├── components/               # Các component tái sử dụng
│   │   └── ProductCard.js        # Card hiển thị 1 sản phẩm
│   │
│   └── config/                   # Cấu hình bên ngoài
│       ├── firebase.js           # Khởi tạo Firebase App, Auth, Firestore
│       └── cloudinary.js         # Hằng số Cloudinary
│
├── assets/                       # Tài nguyên tĩnh (icon, splash, font)
├── constants/                    # Hằng số dùng chung (màu sắc, ...)
├── hooks/                        # Custom hooks
├── app.json                      # Cấu hình Expo (tên, icon, permissions)
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

---

## 🚀 Cài đặt & Chạy

### Yêu cầu

- [Node.js](https://nodejs.org/) >= 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- Expo Go app trên điện thoại (**iOS** / **Android**) hoặc máy ảo

### Các bước cài đặt

```bash
# 1. Clone project
git clone <repository-url>
cd ProductAdminApp

# 2. Cài dependencies
npm install

# 3. Chạy ứng dụng
npm start
# hoặc chạy trực tiếp trên từng nền tảng:
npm run android
npm run ios
npm run web
```

Sau khi chạy, quét QR code bằng **Expo Go** trên điện thoại.

> **Tài khoản demo:** `admin@gmail.com` / `123456`

---

## 🔥 Cấu hình Firebase

File cấu hình: `src/config/firebase.js`

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

### Thiết lập Firestore

Collection: **`sanpham`**

| Field     | Kiểu   | Mô tả                                    |
| --------- | ------ | ---------------------------------------- |
| `tensp`   | string | Tên sản phẩm                             |
| `loaisp`  | string | Loại sản phẩm (Điện tử, Thời trang, ...) |
| `gia`     | number | Giá sản phẩm (VNĐ)                       |
| `hinhanh` | string | URL hình ảnh từ Cloudinary               |

### Bật Firebase Authentication

Vào **Firebase Console → Authentication → Sign-in method** → bật **Email/Password**.

### Firestore Security Rules (Production)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sanpham/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## ☁️ Cấu hình Cloudinary

File cấu hình: `src/config/cloudinary.js`

```js
export const CLOUDINARY_CLOUD_NAME = "your-cloud-name";
export const CLOUDINARY_API_KEY = "your-api-key";
export const CLOUDINARY_API_SECRET = "your-api-secret";
```

> ⚠️ **Lưu ý bảo mật:** Không commit `API_SECRET` lên Git public. Sử dụng biến môi trường hoặc Expo secrets trong môi trường production.

### Cách hoạt động của upload ảnh

```
Người dùng chọn ảnh (expo-image-picker)
        ↓
Tạo FormData với file + timestamp + api_key
        ↓
Gửi POST request đến Cloudinary API (Signed Upload với Basic Auth)
        ↓
Nhận secure_url từ response
        ↓
Lưu URL vào Firestore cùng thông tin sản phẩm
```

---

## 🔄 Luồng hoạt động

```
┌─────────┐     Sai thông tin     ┌──────────┐
│  Khởi   │ ────────────────────► │  Thông   │
│  động   │                       │  báo lỗi │
│ (index) │ ◄────────────────────  └──────────┘
└────┬────┘
     │ Chuyển đến Login
     ▼
┌─────────────┐   Đăng nhập OK   ┌────────────────────┐
│  LoginScreen│ ───────────────► │  ProductListScreen  │
│  (Firebase  │                  │  - Realtime list    │
│   Auth)     │ ◄─────────────── │  - Search          │
└─────────────┘   Đăng xuất      │  - FAB (+) button  │
                                 └──────┬─────┬────────┘
                                        │     │
                              Thêm mới  │     │ Sửa / Xóa
                                        ▼     ▼
                               ┌─────────────────────┐
                               │  AddProductScreen   │
                               │  EditProductScreen  │
                               │  - Chọn ảnh        │
                               │  - Upload Cloudinary│
                               │  - Lưu Firestore   │
                               └─────────────────────┘
```

---

## 📱 Màn hình & Chức năng

### 1. 🔐 LoginScreen (`/`)

- Giao diện dark mode với glassmorphism card
- Nhập Email + Password, toggle hiển thị mật khẩu
- Xác thực qua `signInWithEmailAndPassword` (Firebase Auth)
- Session được persist qua `AsyncStorage` (không cần đăng nhập lại)
- Xử lý các lỗi: sai mật khẩu, email không hợp lệ, quá nhiều lần thử

### 2. 📦 ProductListScreen (`/product-list`)

- Lắng nghe **real-time** từ Firestore bằng `onSnapshot`
- **Tìm kiếm** theo tên (`tensp`) hoặc loại (`loaisp`) ngay phía client
- Pull-to-refresh để reset trạng thái
- FAB button `+` để điều hướng đến màn hình thêm sản phẩm
- Xóa sản phẩm với dialog xác nhận
- Đăng xuất bằng `signOut`

### 3. ➕ AddProductScreen (`/add-product`)

- Chọn ảnh từ thư viện bằng `expo-image-picker`
- Upload ảnh lên Cloudinary bằng **Signed Upload** (Basic Auth)
- Validate form: tên, loại, giá (số hợp lệ)
- Lưu document mới vào collection `sanpham` trên Firestore
- Hiển thị trạng thái loading riêng cho từng bước (upload / lưu)

### 4. ✏️ EditProductScreen (`/edit-product`)

- Nhận dữ liệu sản phẩm qua `router.params`
- Pre-fill toàn bộ form với dữ liệu hiện tại
- Cho phép thay thế ảnh hoặc giữ nguyên ảnh cũ
- Cập nhật document trên Firestore bằng `updateDoc`

### 5. 🃏 ProductCard (Component)

- Hiển thị: ảnh, tên, giá (format VNĐ), ID rút gọn
- Category badge với màu sắc tương ứng theo loại sản phẩm
- Nút **Sửa** và **Xóa** ngay trên card

---

## 📦 Dependencies chính

| Package                                     | Phiên bản | Mục đích                      |
| ------------------------------------------- | --------- | ----------------------------- |
| `expo`                                      | ~54.0     | Framework Expo                |
| `expo-router`                               | ~6.0      | File-based routing            |
| `expo-image`                                | ~3.0      | Hiển thị ảnh tối ưu           |
| `expo-image-picker`                         | ~17.0     | Chọn ảnh từ thiết bị          |
| `firebase`                                  | ^12.11    | Auth + Firestore              |
| `axios`                                     | ^1.14     | HTTP client upload Cloudinary |
| `@react-native-async-storage/async-storage` | ^2.2      | Persist Firebase session      |
| `react-native-reanimated`                   | ~4.1      | Animation                     |

---

## 🛡️ Lưu ý bảo mật

- **Firebase API Key** trong `firebase.js` được bảo vệ bởi Firestore Security Rules — chỉ cho phép user đã xác thực thao tác dữ liệu.
- **Cloudinary API Secret** nên được chuyển sang backend hoặc dùng **unsigned preset** để tránh lộ trong client code khi publish production.
- Không commit file `.env` hoặc credentials lên repository công khai.

---

## 📄 License

MIT © 2026 — KinhNguyen
