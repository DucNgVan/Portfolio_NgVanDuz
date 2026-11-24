#!/usr/bin/env bash
# ==============================================================================
# Script: generate-mtls-certs.sh
# Purpose: Generate Root CA, Server Certificate, and Client Certificate (.p12/.pfx)
#          for Mutual TLS (mTLS) Authentication on Admin Portal.
# ==============================================================================

set -e

# Output directory for certificates
CERT_DIR="$(pwd)/certs"
mkdir -p "$CERT_DIR"
cd "$CERT_DIR"

echo "=========================================================="
echo "🔐 BẮT ĐẦU KHỞI TẠO HỆ THỐNG CHỨNG CHỈ SỐ mTLS (MUTUAL TLS)"
echo "Thư mục lưu chứng chỉ: $CERT_DIR"
echo "=========================================================="

# 1. Thông tin cấu hình
COUNTRY="VN"
STATE="Ho Chi Minh"
LOCALITY="Ho Chi Minh City"
ORGANIZATION="Nguyen Van Duc Portfolio"
OU="DevSecOps Security Gate"
CA_CN="NguyenVanDuc Root CA"
SERVER_CN="localhost"
CLIENT_CN="Nguyen Van Duc (Master Admin)"
P12_PASSWORD="${1:-DucAdmin@2026}"
DAYS_VALID=3650 # 10 năm

# ------------------------------------------------------------------------------
# BƯỚC 1: TẠO ROOT CA (Certificate Authority cá nhân - Tối mật)
# ------------------------------------------------------------------------------
echo ""
echo "👉 [1/4] Đang tạo Root CA (Khóa gốc ký chứng chỉ)..."
openssl genrsa -out ca.key 4096
openssl req -new -x509 -days $DAYS_VALID -key ca.key -out ca.crt \
  -subj "/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION/OU=$OU/CN=$CA_CN"

echo "   ✅ Đã tạo ca.key và ca.crt (Khóa CA gốc)"

# ------------------------------------------------------------------------------
# BƯỚC 2: TẠO SERVER CERTIFICATE (Dành cho Nginx / Node / Web Server)
# ------------------------------------------------------------------------------
echo ""
echo "👉 [2/4] Đang tạo Server Certificate (Dành cho Nginx / Web server)..."
openssl genrsa -out server.key 2048

# OpenSSL config cho Server với SAN (Subject Alternative Name)
cat > server_ext.cnf << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = ducnv.dev
DNS.3 = admin.ducnv.dev
DNS.4 = *.ducnv.dev
IP.1 = 127.0.0.1
EOF

openssl req -new -key server.key -out server.csr \
  -subj "/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION/OU=$OU/CN=$SERVER_CN"

openssl x509 -req -days $DAYS_VALID -in server.csr -CA ca.crt -CAkey ca.key \
  -CAcreateserial -out server.crt -extfile server_ext.cnf

rm -f server.csr server_ext.cnf
echo "   ✅ Đã tạo server.key và server.crt"

# ------------------------------------------------------------------------------
# BƯỚC 3: TẠO CLIENT CERTIFICATE (Dành cho cá nhân Bạn - Admin)
# ------------------------------------------------------------------------------
echo ""
echo "👉 [3/4] Đang tạo Client Certificate (Chứng chỉ cho thiết bị Admin)..."
openssl genrsa -out client.key 2048

cat > client_ext.cnf << EOF
basicConstraints = CA:FALSE
nsCertType = client, email
nsComment = "Nguyen Van Duc Master Admin Client Certificate"
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
keyUsage = critical, nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth, emailProtection
EOF

openssl req -new -key client.key -out client.csr \
  -subj "/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION/OU=$OU/CN=$CLIENT_CN"

openssl x509 -req -days $DAYS_VALID -in client.csr -CA ca.crt -CAkey ca.key \
  -CAcreateserial -out client.crt -extfile client_ext.cnf

rm -f client.csr client_ext.cnf
echo "   ✅ Đã tạo client.key và client.crt"

# ------------------------------------------------------------------------------
# BƯỚC 4: ĐÓNG GÓI CLIENT CERTIFICATE SANG FILE .P12 / .PFX
# ------------------------------------------------------------------------------
echo ""
echo "👉 [4/4] Đóng gói thành file client.p12 để cài vào Trình duyệt (Chrome/Safari/Edge)..."
openssl pkcs12 -export -out client.p12 \
  -inkey client.key \
  -in client.crt \
  -certfile ca.crt \
  -passout pass:"$P12_PASSWORD" \
  -name "Nguyen Van Duc Admin Key"

# Tạo thêm bản copy đuôi .pfx (cho Windows nếu cần)
cp client.p12 client.pfx

echo "   ✅ Đã tạo client.p12 và client.pfx thành công!"
echo ""
echo "=========================================================="
echo "🎉 HOÀN TẤT KHỞI TẠO BỘ CHỨNG CHỈ SỐ mTLS!"
echo "=========================================================="
echo "📁 Các file được lưu tại: $CERT_DIR"
echo "  1. 🔑 client.p12 (hoặc client.pfx) : FILE QUAN TRỌNG NHẤT ĐỂ CÀI VÀO MÁY"
echo "     👉 Mật khẩu mở file: $P12_PASSWORD"
echo "  2. 🏛️ ca.crt                      : File Root CA để nạp vào Server / Cloudflare / Nginx"
echo "  3. 🔒 ca.key                      : Khóa bí mật của Root CA (LƯU TRỮ TỐI MẬT)"
echo "  4. 🌐 server.crt & server.key     : Dùng cho Nginx / HTTPS Server"
echo "=========================================================="
