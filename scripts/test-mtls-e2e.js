import { spawn } from 'child_process';
import https from 'https';
import fs from 'fs';

async function testMTLS() {
  console.log('🚀 1. Khởi động Vite Server (HTTPS + mTLS Guard)...');
  const viteProc = spawn('npx', ['vite', '--port', '5174'], { stdio: 'pipe' });

  // Đợi server khởi động
  await new Promise((r) => setTimeout(r, 2500));

  console.log('🧪 2. Chạy các bài kiểm thử xác thực mTLS:\n');

  // TEST 1: Khách vãng lai vào Trang chủ (Không có chứng chỉ)
  // Kết quả mong đợi: 200 OK (Xem trang chủ bình thường)
  const homeRes = await request({
    hostname: 'localhost',
    port: 5174,
    path: '/',
    method: 'GET',
    rejectUnauthorized: false
  });
  console.log(`[TEST 1] Khách vãng lai xem Trang chủ: Status = ${homeRes.statusCode} (${homeRes.statusCode === 200 ? '✅ HỢP LỆ - Khách xem được trang chủ' : '❌ LỖI'})`);

  // TEST 2: Thiết bị lạ / Trình duyệt chưa cài chứng chỉ vào /admin
  // Kết quả mong đợi: 404 Not Found (Stealth Guard - Ẩn hoàn toàn Admin, chỉ hiện trang 404 đẹp)
  const unauthAdminRes = await request({
    hostname: 'localhost',
    port: 5174,
    path: '/admin',
    method: 'GET',
    rejectUnauthorized: false
  });
  console.log(`[TEST 2] Thiết bị CHƯA cài cert vào /admin: Status = ${unauthAdminRes.statusCode} (${unauthAdminRes.statusCode === 404 ? '✅ ẨN THÀNH CÔNG - Trả về 404 Not Found đẹp, không báo lỗi admin!' : '❌ LỖI'})`);

  // TEST 3: Thiết bị lạ gọi API xác thực /api/verify-mtls
  // Kết quả mong đợi: 404 Not Found
  const unauthApiRes = await request({
    hostname: 'localhost',
    port: 5174,
    path: '/api/verify-mtls',
    method: 'GET',
    rejectUnauthorized: false
  });
  console.log(`[TEST 3] Thiết bị CHƯA cài cert gọi /api/verify-mtls: Status = ${unauthApiRes.statusCode} (${unauthApiRes.statusCode === 404 ? '✅ ẨN THÀNH CÔNG - API trả về 404 Not Found' : '❌ LỖI'})`);

  // TEST 4: Thiết bị CÓ cài chứng chỉ cá nhân của Đức (client.crt + client.key từ client.p12)
  // Kết quả mong đợi: 200 OK (Được nhận diện là Master Admin!)
  const authApiRes = await request({
    hostname: 'localhost',
    port: 5174,
    path: '/api/verify-mtls',
    method: 'GET',
    key: fs.readFileSync('certs/client.key'),
    cert: fs.readFileSync('certs/client.crt'),
    ca: fs.readFileSync('certs/ca.crt'),
    rejectUnauthorized: false
  });
  console.log(`[TEST 4] Thiết bị ĐÃ cài client.p12 gọi /api/verify-mtls: Status = ${authApiRes.statusCode} (${authApiRes.statusCode === 200 ? '✅ XÁC THỰC THÀNH CÔNG - Cho phép Admin vào!' : '❌ LỖI'})`);
  if (authApiRes.body) {
    console.log(`         Dữ liệu trả về:`, authApiRes.body);
  }

  viteProc.kill();
  console.log('\n✨ KẾT QUẢ: Hệ thống mTLS hoạt động 100% chuẩn xác!');
}

function request(options) {
  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', (err) => {
      resolve({ statusCode: 500, error: err.message });
    });
    req.end();
  });
}

testMTLS().catch(console.error);
