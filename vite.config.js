import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const keyPath = path.resolve(__dirname, './certs/server.key')
const certPath = path.resolve(__dirname, './certs/server.crt')
const caPath = path.resolve(__dirname, './certs/ca.crt')
const hasMtlsCerts = fs.existsSync(keyPath) && fs.existsSync(certPath) && fs.existsSync(caPath)

// Vite plugin to enforce mTLS at the local development server layer
function mtlsDevGuard() {
  return {
    name: 'vite-plugin-mtls-guard',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const parsedUrl = new URL(req.url, 'https://localhost');
        const pathname = parsedUrl.pathname;

        const getClientCertInfo = () => {
          const socket = req.socket || req.client;
          const cert = socket && typeof socket.getPeerCertificate === 'function' 
            ? socket.getPeerCertificate() 
            : null;
          
          const isTlsAuthorized = Boolean(socket && socket.authorized);
          const hasValidSubject = Boolean(
            cert && 
            cert.subject && 
            (cert.subject.CN === 'Nguyen Van Duc (Master Admin)' || (cert.issuer && cert.issuer.CN === 'NguyenVanDuc Root CA'))
          );

          const isAuthorized = isTlsAuthorized || hasValidSubject;

          return {
            isAuthorized,
            cert,
            subject: cert?.subject?.CN || (isAuthorized ? 'Nguyen Van Duc (Master Admin)' : 'Unknown'),
            issuer: cert?.issuer?.CN || (isAuthorized ? 'NguyenVanDuc Root CA' : 'Unknown'),
          };
        };

        // API Endpoint for frontend handshake verification
        if (pathname === '/api/verify-mtls') {
          const { isAuthorized, subject, issuer } = getClientCertInfo();

          res.setHeader('Content-Type', 'application/json');
          if (!isAuthorized) {
            res.statusCode = 404;
            res.end(JSON.stringify({ 
              authorized: false, 
              error: 'NOT_FOUND'
            }));
          } else {
            res.statusCode = 200;
            res.end(JSON.stringify({ 
              authorized: true, 
              subject,
              issuer
            }));
          }
          return;
        }

        // Direct /admin route guard at HTTP network layer: stealth 404 if not authorized
        if (pathname === '/admin' || pathname === '/admin/') {
          const { isAuthorized } = getClientCertInfo();
          if (!isAuthorized) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Page Not Found | Nguyen Van Duc</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0a0b10;
      color: #f4efea;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100vh;
      padding: 30px 24px;
      user-select: none;
    }
    header, footer {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #666;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    .brand { font-size: 32px; font-weight: 600; color: #f4efea; text-decoration: none; font-family: "Caveat", cursive, sans-serif; }
    main {
      text-align: center;
      max-width: 520px;
      margin: auto;
    }
    .badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 11px;
      letter-spacing: 0.15em;
      color: #d8c8a8;
      text-transform: uppercase;
      margin-bottom: 24px;
      font-family: ui-monospace, monospace;
    }
    h1 {
      font-size: clamp(80px, 18vw, 130px);
      font-weight: 900;
      line-height: 0.9;
      margin-bottom: 12px;
      background: linear-gradient(180deg, #ffffff 0%, #e5ded4 50%, #8c7355 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    h2 {
      font-size: 22px;
      color: #fff;
      margin-bottom: 12px;
      font-weight: 700;
    }
    p {
      font-size: 13px;
      line-height: 1.6;
      color: #9ca3af;
      margin-bottom: 28px;
    }
    a.btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 28px;
      border-radius: 999px;
      background: linear-gradient(90deg, #d8c8a8, #c5a880);
      color: #0a0b10;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    a.btn:hover {
      transform: scale(1.02);
      box-shadow: 0 0 25px rgba(216, 200, 168, 0.35);
    }
  </style>
</head>
<body>
  <header>
    <a href="/" class="brand">nguyenvanduc</a>
    <span>PORTFOLIO // 2025</span>
  </header>
  <main>
    <div class="badge">✦ 404 • Page Not Found</div>
    <h1>404</h1>
    <h2>Trang không tồn tại</h2>
    <p>Đường dẫn bạn vừa truy cập có thể đã bị thay đổi, chuyển hướng hoặc không tồn tại trong hệ thống.</p>
    <a href="/" class="btn">← Quay về Trang chủ</a>
  </main>
  <footer>
    <span>© 2025 Nguyen Van Duc</span>
    <span>DA NANG, VIETNAM</span>
  </footer>
</body>
</html>`);
            return;
          }
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mtlsDevGuard()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: false,
    https: hasMtlsCerts ? {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
      ca: fs.readFileSync(caPath),
      requestCert: true,
      rejectUnauthorized: false,
    } : false,
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-stdlib'],
          'framer-vendor': ['framer-motion'],
        },
      },
    },
  },
})
