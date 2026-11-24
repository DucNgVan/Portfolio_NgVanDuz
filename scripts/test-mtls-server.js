import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const certDir = path.join(rootDir, 'certs');

// Kiểm tra xem đã sinh chứng chỉ mTLS chưa
if (!fs.existsSync(path.join(certDir, 'ca.crt')) ||
    !fs.existsSync(path.join(certDir, 'server.key')) ||
    !fs.existsSync(path.join(certDir, 'server.crt'))) {
  console.error('\n❌ Lỗi: Chưa tìm thấy các file chứng chỉ trong thư mục /certs.');
  console.error('👉 Vui lòng chạy lệnh: npm run certs:generate trước!\n');
  process.exit(1);
}

// 1. Cấu hình HTTPS & mTLS (Mutual TLS)
const options = {
  key: fs.readFileSync(path.join(certDir, 'server.key')),
  cert: fs.readFileSync(path.join(certDir, 'server.crt')),
  // File Root CA chứng nhận danh tính Client:
  ca: fs.readFileSync(path.join(certDir, 'ca.crt')),
  // Yêu cầu Client xuất trình chứng chỉ nhưng không từ chối kết nối ngay tại socket
  // để trang chủ bình thường vẫn xem được, chỉ bắt buộc chặn khi vào /admin
  requestCert: true,
  rejectUnauthorized: false
};

const PORT = 8443;

const server = https.createServer(options, (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  console.log(`\n📡 [${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  // Kiểm tra chứng chỉ Client do trình duyệt gửi lên trong quá trình bắt tay TLS
  const clientCert = req.socket.getPeerCertificate();
  const isCertAuthorized = req.client.authorized;

  console.log(`   🔒 TLS Handshake Client Cert:`, clientCert && clientCert.subject ? clientCert.subject.CN : 'None');
  console.log(`   🛡️ mTLS Authorized status:`, isCertAuthorized ? '✅ AUTHORIZED (SUCCESS)' : '❌ UNAUTHORIZED / NONE');

  // NẾU TRUY CẬP ROUTE ADMIN HOẶC BẬT ADMIN TRÊN CỬA SỔ
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (!isCertAuthorized) {
      // 🚫 TỪ CHỐI KẾT NỐI: Người dùng không có chứng chỉ số hoặc chứng chỉ giả mạo
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="utf-8">
          <title>403 Forbidden - Mutual TLS Required</title>
          <style>
            body { background: #0c0d10; color: #f4efea; font-family: -apple-system, BlinkMacSystemFont, monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .box { background: #16171d; border: 1px solid #e11d48; padding: 40px; border-radius: 16px; max-width: 580px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
            h1 { color: #f43f5e; margin-top: 0; font-size: 22px; display: flex; align-items: center; gap: 8px; }
            p { font-size: 14px; line-height: 1.6; color: #9ca3af; }
            code { background: #000; padding: 3px 6px; border-radius: 4px; color: #fbbf24; }
            .badge { display: inline-block; background: rgba(225,29,72,0.2); color: #f43f5e; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: bold; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <div class="box">
            <span class="badge">CHẶN TẠI TẦNG BẮT TAY MÃ HOÁ (NETWORK / TLS LAYER)</span>
            <h1>⛔ 403 - Mutual TLS Authentication Required</h1>
            <p>Trình duyệt của bạn <b>KHÔNG</b> xuất trình Chứng chỉ số Client (Client Certificate) hợp lệ được cấp bởi Root CA của hệ thống.</p>
            <p>Truy cập bị từ chối ngay lập tức tại tầng mã hoá TLS trước khi code website được thực thi.</p>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;">
            <p style="font-size: 12px; color: #6b7280;">
              💡 <b>Dành cho Admin:</b> Cài đặt file <code>client.p12</code> (Mật khẩu: <code>DucAdmin@2026</code>) vào macOS Keychain hoặc Windows Certificate Manager, sau đó khởi động lại trình duyệt để truy cập thẳng.
            </p>
          </div>
        </body>
        </html>
      `);
      return;
    }

    // ✅ XÁC THỰC THÀNH CÔNG: Trình duyệt có chứng chỉ hợp lệ
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="utf-8">
        <title>mTLS Verified - Welcome Admin</title>
        <style>
          body { background: #0c0d10; color: #f4efea; font-family: -apple-system, BlinkMacSystemFont, monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .box { background: #16171d; border: 1px solid #10b981; padding: 40px; border-radius: 16px; max-width: 620px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          h1 { color: #10b981; margin-top: 0; font-size: 22px; }
          p { font-size: 14px; line-height: 1.6; color: #d1d5db; }
          .info { background: #090a0d; border: 1px solid #27272a; padding: 15px; border-radius: 10px; font-family: monospace; font-size: 12px; color: #a7f3d0; margin-top: 15px; }
          .btn { display: inline-block; margin-top: 20px; background: #d8c8a8; color: #000; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>🔐 mTLS BẢO MẬT THÀNH CÔNG!</h1>
          <p>Trình duyệt của bạn đã xuất trình chứng chỉ số hợp lệ trong quá trình bắt tay TLS. Bạn có quyền quản trị viên cao nhất.</p>
          <div class="info">
            <div><b>Chủ sở hữu (CN):</b> ${clientCert.subject.CN}</div>
            <div><b>Cơ quan cấp (Issuer):</b> ${clientCert.issuer.CN}</div>
            <div><b>Hạn chứng chỉ:</b> ${clientCert.valid_to}</div>
            <div><b>Serial Number:</b> ${clientCert.serialNumber}</div>
          </div>
          <a class="btn" href="/#admin">Tiến vào Dashboard Quản trị Portfolio</a>
        </div>
      </body>
      </html>
    `);
    return;
  }

  // TRANG CHỦ BÌNH THƯỜNG (Dành cho mọi khách vãng lai)
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="utf-8">
      <title>Portfolio - Public Gateway</title>
      <style>
        body { background: #f8f7f4; color: #111113; font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .box { background: #fff; border: 1px solid #e5e5e5; padding: 40px; border-radius: 16px; max-width: 540px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        h1 { margin-top: 0; font-size: 24px; font-weight: 800; }
        p { font-size: 14px; line-height: 1.6; color: #666; }
        .link { display: inline-block; margin-top: 15px; background: #111113; color: #fff; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>Nguyen Van Duc — Portfolio</h1>
        <p>Đây là trang Portfolio công khai. Mọi khách truy cập đều xem được bình thường mà không cần chứng chỉ số.</p>
        <p>Thử nghiệm tính năng mTLS bảo mật cao:</p>
        <a class="link" href="/admin">Truy cập thử đường dẫn Quản trị (/admin) &rarr;</a>
      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`
========================================================================
🚀 MÁY CHỦ THỬ NGHIỆM BẢO MẬT mTLS ĐANG CHẠY TẠI:
👉 URL: https://localhost:${PORT}
========================================================================
🧪 CÁCH THỬ NGHIỆM THỰC TẾ:
1. Mở trình duyệt ẩn danh (Chưa cài client.p12):
   👉 Vào https://localhost:${PORT}/admin
   👉 KẾT QUẢ: Bị chặn đứng ngay lập tức với lỗi 403 Forbidden!

2. Cài file certs/client.p12 vào máy (Pass: DucAdmin@2026):
   👉 Mở lại https://localhost:${PORT}/admin
   👉 KẾT QUẢ: Trình duyệt tự động xuất trình chứng chỉ và mở thẳng Admin!
========================================================================
(Nhấn Ctrl+C để dừng máy chủ thử nghiệm)
`);
});
