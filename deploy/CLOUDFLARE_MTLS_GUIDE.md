# HƯỚNG DẪN CẤU HÌNH mTLS VỚI CLOUDFLARE (BẢO VỆ TẦNG EDGE CLOUD)

Nếu portfolio của bạn sử dụng tên miền chạy qua **Cloudflare Proxy (Đám mây màu cam 🟠)**, bạn có thể thiết lập mTLS miễn phí ngay trên Cloudflare Dashboard mà không cần cấu hình VPS phức tạp.

---

## 🌟 CƠ CHẾ HOẠT ĐỘNG TRÊN CLOUDFLARE
1. Khách truy cập `ducnv.dev` $\rightarrow$ Cloudflare phục vụ bình thường.
2. Bất kỳ ai truy cập `ducnv.dev/admin` (hoặc subdomain `admin.ducnv.dev`):
   - **Có chứng chỉ Client trên máy:** Cloudflare nhận diện chứng chỉ tại mạng Edge toàn cầu $\rightarrow$ Cho phép kết nối vào Admin.
   - **Người lạ / Hacker không có chứng chỉ:** Cloudflare chặn đứng với mã lỗi **403 Forbidden** hoặc từ chối bắt tay SSL ngay tại Edge Network của Cloudflare, **chưa bao giờ chạm tới hosting hay code website của bạn**.

---

## CÁC BƯỚC THIẾT LẬP (5 PHÚT)

### BƯỚC 1: TẠO HOẶC UPLOAD CHỨNG CHỈ CLIENT TRÊN CLOUDFLARE

1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/) và chọn tên miền của bạn.
2. Vào menu bên trái: **SSL/TLS** $\rightarrow$ **Client Certificates** (Chứng chỉ số Khách).
3. Nhấn **Create Certificate** (Tạo chứng chỉ):
   - **Private key type**: Chọn `RSA (2048)`
   - **Certificate validity**: Chọn `10 years` (hoặc tối đa theo Cloudflare cho phép).
4. Nhấn **Create**:
   - Cloudflare sẽ hiển thị `Certificate` (PEM) và `Private Key` (PEM).
   - Hãy sao chép 2 nội dung này và lưu lại.
   - Hoặc bạn có thể dùng file `certs/ca.crt` đã sinh bằng script của dự án để upload lên mục **Upload Custom CA** (nếu dùng gói Enterprise/Pro). Với Free plan, dùng trực tiếp tính năng **Create Certificate** của Cloudflare là nhanh nhất.
5. Đóng gói thành `.p12` để cài vào máy:
   Lưu chứng chỉ vào file `cf-client.crt` và key vào `cf-client.key`, sau đó chạy:
   ```bash
   openssl pkcs12 -export -out DucAdmin-Cloudflare.p12 -inkey cf-client.key -in cf-client.crt -name "Duc Admin Cloudflare"
   ```

---

### BƯỚC 2: TẠO LUẬT CHẶN (WAF RULE) BẮT BUỘC mTLS CHO ĐƯỜNG DẪN ADMIN

1. Vào menu **Security** $\rightarrow$ **WAF** (Web Application Firewall) $\rightarrow$ tab **Custom rules**.
2. Nhấn **Create rule**:
   - **Rule name**: `Enforce mTLS on Admin Portal`
   - **Field**: `URI Path`
   - **Operator**: `contains`
   - **Value**: `/admin`
3. Nhấn **And** để thêm điều kiện:
   - **Field**: `Client Certificate Verified` (tên trường: `cf.tls_client_auth.cert_verified`)
   - **Operator**: `does not equal` (hoặc `equals false`)
   - **Value**: `true`
4. Chọn Action:
   - **Action**: `Block` (Chặn đứng hoàn toàn)
5. Nhấn **Deploy** (Áp dụng).

> **Biểu thức WAF mẫu:**
> ```
> (http.request.uri.path contains "/admin" and not cf.tls_client_auth.cert_verified)
> ```

---

### BƯỚC 3: CÀI FILE CHỨNG CHỈ .P12 VÀO TRÌNH DUYỆT CỦA BẠN

Xem hướng dẫn chi tiết cách nhấp đúp file `.p12` để cài trên macOS Keychain / Chrome / Safari trong file `certs/README.md`.
