# REACTJS + NODEJS

📄 **Tài liệu dự án:** [Xem tại đây](https://docs.google.com/document/d/1BMnu-nM0SRbCQsBQRL7KOHleDQndocKbTZzLleYwUjA/edit?tab=t.0)

## 🚀 Giới thiệu  
Dự án này là một ứng dụng web full-stack sử dụng **ReactJS** cho frontend và **Node.js** (Express) cho backend.

- **Frontend:** Vite + ReactJS  
- **Backend:** Node.js + MySQL  
- **Xác thực:** JWT (JSON Web Token)  

---

## 🔧 Cách cài đặt và chạy dự án  

### ⚙️ Cài đặt Node.js  
Cần kiểm tra xem tra Node.js đã được cài đặt chưa bằng cách chạy lệnh sau:  
```bash
node -v && npm -v
```
Nếu chưa cài đặt hãy truy cập trang:
```bash
https://nodejs.org/en
```
### 🖥️ Cách cài đặt dự án về máy và chạy
### 1. Cách Clone dự án về máy  
```bash
git clone https://github.com/Huannio/Booking-App.git
```
### 2. Sử dụng Backend(be)
```bash
cd be
npm install(npm i) # Cài đặt thư viện
npm run dev # chạy React
```
### 3. Sử dụng Frontend(fe)
Nếu bạn đang ở thư mục Backend trước đó thì cần chuyển về thư mục Frontend:
```bash
cd ../fe
npm install(npm i) # Cài đặt thư viện
npm run dev # chạy React
```
### 📌 Cách đẩy code lên git
Trước khi code các bạn hãy:
```bash
git pull origin main # Kéo code mới nhất về máy:
```
Sau khi code xong có thể thực hiện lệnh để đẩy code lên:
```bash
git add .  # Thêm tất cả file vào Git
git commit -m "Commit"  # Lưu thay đổi với thông điệp commit
git push -u origin "Tên nhánh"  # Đẩy code lên GitHub
```
