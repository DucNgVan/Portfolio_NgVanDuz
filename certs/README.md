# HƯỚNG DẪN CÀI ĐẶT CHỨNG CHỈ SỐ CLIENT (mTLS - MUTUAL TLS)
### DÀNH CHO NGUYỄN VĂN ĐỨC (MASTER ADMIN)

Hệ thống mTLS (Mutual TLS) bảo mật 2 chiều ở cấp độ giao vận mạng (Transport Layer Security). Khi bạn truy cập trang quản trị `/admin`:
- **Trình duyệt của bạn:** Tự động gửi kèm chứng chỉ cá nhân đã cài trong máy.
- **Server:** Kiểm tra chữ ký số từ Root CA. Nếu đúng là chứng chỉ của bạn $\rightarrow$ Mở thẳng trang Admin.
- **Người lạ / Hacker:** Trình duyệt không có chứng chỉ này $\rightarrow$ Bị từ chối kết nối ngay tức thì (mã lỗi 403 Forbidden hoặc lỗi SSL Handshake). Không ai có thể dò mật khẩu hay quét lỗ hổng code.

---

## 📁 DANH SÁCH FILE ĐÃ ĐƯỢC TẠO TẠI THƯ MỤC `certs/`

1. **`client.p12` (hoặc `client.pfx`)** ⭐ **[QUAN TRỌNG NHẤT]**:
   - File chứng chỉ cá nhân của bạn, chứa cả Certificate + Private Key được đóng gói bảo mật PKCS#12.
   - **Mật khẩu mở file mặc định:** `DucAdmin@2026`
   - File này bạn dùng để cài vào macOS Keychain, Windows, iPhone hoặc Android.
2. **`ca.crt`**:
   - Chứng chỉ gốc (Root CA). File này nạp vào Nginx server hoặc Cloudflare để server biết chỉ tin tưởng các client do CA này ký.
3. **`server.crt` & `server.key`**:
   - Cặp chứng chỉ SSL dành cho Web Server (Nginx / Node.js).

---

## 🖥️ HƯỚNG DẪN CÀI FILE `client.p12` VÀO THIẾT BỊ CỦA BẠN

### 1. DÀNH CHO MAC (macOS — Chrome, Safari, Edge, Brave, Arc)
1. Mở Finder, tìm đến thư mục `certs/` trong dự án.
2. Nhấp đúp chuột (Double click) vào file **`client.p12`**.
3. Ứng dụng **Keychain Access (Móc khoá)** trên Mac sẽ tự động mở lên:
   - Mục **Keychain**: Chọn `login` (hoặc `Đăng nhập`).
   - Nhấn **Add (Thêm)**.
4. Hệ thống sẽ hỏi mật khẩu mở file chứng chỉ: Nhập `DucAdmin@2026` $\rightarrow$ Nhấn OK.
5. (Tuỳ chọn) Tin cậy Root CA:
   - Trong Keychain Access, kéo thả file `ca.crt` vào mục `System` hoặc `login`.
   - Nhấp đúp vào chứng chỉ `NguyenVanDuc Root CA` $\rightarrow$ Mở rộng mục **Trust** $\rightarrow$ Chọn **Always Trust (Luôn tin cậy)**.
6. **Xong!** Khởi động lại trình duyệt (Chrome / Safari). Khi bạn vào `https://ducnv.dev/admin` (hoặc máy chủ test `https://localhost:8443/admin`), trình duyệt sẽ hiện một cửa sổ nhỏ hỏi:
   > *"Select a certificate to authenticate yourself to..."*
   > Bạn chỉ cần chọn chứng chỉ **Nguyen Van Duc (Master Admin)** và nhấn **OK**. Lần sau trình duyệt sẽ tự động nhớ và vào thẳng!

---

### 2. DÀNH CHO WINDOWS (Chrome, Edge, Firefox)
1. Nhấp đúp vào file **`client.pfx`** (hoặc `client.p12`).
2. Trình thuật sĩ **Certificate Import Wizard** xuất hiện:
   - Store Location: Chọn **Current User** $\rightarrow$ Nhấn **Next**.
   - File to Import: Nhấn **Next**.
   - Password: Nhập `DucAdmin@2026` $\rightarrow$ Tích chọn *"Mark this key as exportable"* nếu muốn backup $\rightarrow$ Nhấn **Next**.
   - Certificate Store: Chọn *"Automatically select the certificate store based on the type of certificate"* $\rightarrow$ Nhấn **Next** $\rightarrow$ Nhấn **Finish**.
3. Xong! Mở Chrome hoặc Edge lên là dùng được ngay.

---

### 3. DÀNH CHO IPHONE / IPAD (iOS / Safari)
1. Gửi file `client.p12` qua **AirDrop** từ máy Mac sang iPhone của bạn, hoặc gửi qua email cá nhân.
2. Trên iPhone, nhấn vào file $\rightarrow$ Chọn **Save to Files** hoặc chấp nhận hồ sơ cấu hình.
3. Vào **Settings (Cài đặt)** $\rightarrow$ Sẽ thấy mục **Profile Downloaded (Đã tải về hồ sơ)** ở ngay đầu.
4. Nhấn **Install (Cài đặt)** $\rightarrow$ Nhập mật mã iPhone $\rightarrow$ Nhập mật khẩu chứng chỉ: `DucAdmin@2026`.
5. Vào **Settings** $\rightarrow$ **General (Cài đặt chung)** $\rightarrow$ **About (Giới thiệu)** $\rightarrow$ **Certificate Trust Settings** $\rightarrow$ Bật gạt công tắc cho phép tin cậy chứng chỉ.
6. Mở Safari trên iPhone gõ link admin $\rightarrow$ Vào thẳng mượt mà, đổi Wi-Fi hay 4G đều hoạt động hoàn hảo!

---

## 🧪 CÁCH TEST THỰC TẾ NGAY TRÊN MÁY BẠN

Chúng tôi đã viết sẵn một máy chủ thử nghiệm mTLS độc lập bằng Node.js:
1. Mở Terminal chạy lệnh:
   ```bash
   npm run test:mtls
   ```
2. Mở trình duyệt ẩn danh (chưa có chứng chỉ): Truy cập `https://localhost:8443/admin` $\rightarrow$ **Bị chặn đứng 403 Forbidden ngay lập tức!**
3. Mở trình duyệt đã cài `client.p12`: Truy cập `https://localhost:8443/admin` $\rightarrow$ **Trình duyệt tự nhận diện chứng chỉ và chào đón Admin thành công!**
