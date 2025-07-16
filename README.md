# E-commerce-course

## 📁 Cấu trúc dự án

```
project-root/
├── public/              # Tài nguyên tĩnh
├── src/                 # Mã nguồn React
│   ├── App.jsx
│   └── main.jsx
├── index.html           # Template HTML chính
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Hướng dẫn cài đặt

### 1. Clone dự án

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc dùng yarn:
# yarn install
```

---

## 🧪 Chạy ứng dụng trong môi trường phát triển

```bash
npm run dev
# hoặc:
# yarn dev
```

Ứng dụng sẽ chạy tại: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build cho production

```bash
npm run build
# hoặc:
# yarn build
```

Kết quả build sẽ nằm trong thư mục `dist/`.

---

## 🔍 Preview bản build

Sau khi build:

```bash
npm run preview
# hoặc:
# yarn preview
```

---

## 🧹 Kiểm tra lint

```bash
npm run lint
# hoặc:
# yarn lint
```

---

## 🧰 Mở rộng (Tuỳ chọn)

### ➕ Thêm TypeScript:
```bash
npm install --save-dev typescript
# hoặc tạo lại dự án từ template:
npm create vite@latest my-app -- --template react-ts
```

### 🔁 Dùng plugin SWC để build nhanh hơn:
```bash
npm install -D @vitejs/plugin-react-swc
```
Thay `@vitejs/plugin-react` trong `vite.config.js` bằng:
```js
import react from '@vitejs/plugin-react-swc'
```

---

## 🧑‍💻 Đóng góp

Mọi ý kiến đóng góp, pull request đều được chào đón!

---

## 📄 License

MIT License
