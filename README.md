<div align="center">

# ⚡ Nguyen Van Duc — Developer Portfolio

**Software Engineer & Creative Coder**  
*Building modern, high-performance web experiences with clean architecture and cyberpunk aesthetic.*

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Live Demo](https://ducngvan.github.io/Portfolio_NgVanDuz/) · [Report Bug](https://github.com/DucNgVan/Portfolio_NgVanDuz/issues) · [Request Feature](https://github.com/DucNgVan/Portfolio_NgVanDuz/issues)

</div>

---

## 📖 Giới thiệu / Overview

Trang Portfolio cá nhân của **Nguyễn Văn Đức** — Kỹ sư phần mềm đam mê kiến tạo trải nghiệm web hiện đại, tốc độ cao và giàu tính tương tác. Dự án được phát triển bằng **React 18**, **Vite**, **Tailwind CSS** và **Framer Motion**, mang phong cách thiết kế Cyberpunk & Modern Brutalism độc đáo.

> Personal developer portfolio showcasing featured projects, fullstack capabilities, technical expertise, university honors, and an interactive contact experience.

---

## ✨ Điểm nổi bật / Features

- 🖥️ **Kinetic Hero & Terminal Simulator**: Giao diện mở đầu ấn tượng với kinetic typography và giả lập cửa sổ terminal tương tác (`whoami`, `git status`,...).
- 🎨 **Modern Cyberpunk / Brutalism Aesthetic**: Phối màu tối trầm (dark mode) kết hợp các điểm nhấn ánh sáng tinh tế và đường nét công nghệ sắc nét.
- 🎯 **Interactive Project Showcase**: Danh sách dự án nổi bật với modal chi tiết, liên kết mã nguồn GitHub và bản live demo thực tế.
- 📊 **Skills & Expertise Matrix**: Trực quan hóa năng lực kỹ thuật (Frontend, Backend, DevOps, Tools) và kỹ năng mềm với thanh đo cấp độ sinh động.
- 🏆 **Achievements & Education Timeline**: Lộ trình học tập, giải thưởng nghiên cứu khoa học, hackathon và danh hiệu sinh viên tiêu biểu.
- 🤝 **Interactive Handshake & Confetti**: Hiệu ứng kết nối tương tác độc đáo khi người dùng bắt tay hợp tác cùng pháo hoa giấy chúc mừng.
- ⚡ **Siêu mượt mà & Tối ưu hiệu năng**: Tối ưu bundle size, lazy loading, render 60 FPS mượt mà nhờ Framer Motion & Vite.
- 📱 **Fully Responsive**: Hiển thị hoàn hảo trên mọi thiết bị (Desktop, Tablet, Mobile).

---

## 🛠️ Công nghệ sử dụng / Tech Stack

| Danh mục | Công nghệ |
| :--- | :--- |
| **Core Framework** | [React 18](https://react.dev/), [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/), [PostCSS](https://postcss.org/), [Autoprefixer](https://github.com/postcss/autoprefixer) |
| **Animation & Motion** | [Framer Motion 12](https://www.framer.com/motion/), [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) |
| **Icons & UI Utilities**| [Lucide React](https://lucide.dev/), `clsx`, `tailwind-merge` |
| **Typography** | Google Fonts (*Syne*, *Anton*, *Bebas Neue*, *Plus Jakarta Sans*, *JetBrains Mono*) |

---

## 🚀 Cài đặt & Chạy cục bộ / Getting Started

### Điều kiện tiên quyết (Prerequisites)
- [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
- Trình quản lý gói `npm`, `pnpm` hoặc `yarn`

### Các bước cài đặt (Installation)

1. **Clone repository về máy**:
   ```bash
   git clone https://github.com/DucNgVan/Portfolio_NgVanDuz.git
   cd Portfolio_NgVanDuz
   ```

2. **Cài đặt các gói phụ thuộc (dependencies)**:
   ```bash
   npm install
   ```

3. **Khởi chạy môi trường phát triển (Dev Server)**:
   ```bash
   npm run dev
   ```
   *Mở trình duyệt tại địa chỉ: `http://localhost:5173`*

4. **Đóng gói dự án cho môi trường sản xuất (Build Production)**:
   ```bash
   npm run build
   ```

5. **Xem thử bản build (Preview)**:
   ```bash
   npm run preview
   ```

---

## 📁 Cấu trúc thư mục / Project Structure

```text
Portfolio_NgVanDuz/
├── public/                 # Static assets
├── src/
│   ├── components/         # Các thành phần giao diện React
│   │   ├── AboutSection.jsx          # Giới thiệu bản thân & thống kê
│   │   ├── AchievementsSection.jsx   # Giải thưởng & thành tích học tập
│   │   ├── BrandIcons.jsx            # Biểu tượng thương hiệu công nghệ
│   │   ├── ContactSection.jsx        # Biểu mẫu liên hệ & mạng xã hội
│   │   ├── CustomCursor.jsx          # Con trỏ chuột tương tác tuỳ biến
│   │   ├── ExperienceSection.jsx     # Kinh nghiệm làm việc & dự án
│   │   ├── ExpertiseSection.jsx      # Ma trận kỹ năng Tech & Soft skills
│   │   ├── Footer.jsx                # Chân trang & bản quyền
│   │   ├── HandshakeInteractive.jsx  # Hiệu ứng bắt tay tương tác
│   │   ├── HeroSection.jsx           # Hero banner & Terminal
│   │   ├── Navbar.jsx                # Thanh điều hướng nổi
│   │   ├── ParticleBackground.jsx    # Hiệu ứng hạt nền tương tác
│   │   ├── Preloader.jsx             # Màn hình chờ khởi động
│   │   ├── ProjectModal.jsx          # Cửa sổ chi tiết dự án
│   │   ├── ScrollReveal.jsx          # Hiệu ứng cuộn hiển thị
│   │   └── WorkSection.jsx           # Khu vực trưng bày dự án
│   ├── data/
│   │   └── portfolioData.js          # Dữ liệu nội dung tập trung (thông tin, dự án, skills)
│   ├── styles/                       # Tệp CSS tuỳ biến
│   ├── App.jsx                       # Thành phần gốc của ứng dụng
│   └── main.jsx                      # Điểm khởi chạy React DOM
├── index.html              # Tệp HTML chính tích hợp SEO & Fonts
├── package.json            # Cấu hình dự án và dependencies
├── tailwind.config.js      # Cấu hình Tailwind CSS tuỳ biến
├── vite.config.js          # Cấu hình Vite bundler
└── README.md               # Tài liệu hướng dẫn dự án
```

---

## ⚙️ Tùy biến dữ liệu / Customization

Bạn có thể dễ dàng thay đổi toàn bộ nội dung của website chỉ bằng việc cập nhật tệp:
👉 `src/data/portfolioData.js`

- **Thông tin cá nhân**: `personalInfo` (Họ tên, vai trò, bio, email, mạng xã hội,...)
- **Kỹ năng chuyên môn**: `techSkills` (Frontend, Backend, DevOps)
- **Kỹ năng mềm**: `softSkills`
- **Dự án nổi bật**: `githubProjects` (Tên dự án, công nghệ, link GitHub, live demo)
- **Thành tích**: `achievements` (Học bổng, giải thưởng, hackathon)

---

## 📬 Liên hệ / Contact

- **Tác giả**: Nguyễn Văn Đức (DucNgVan)
- **GitHub**: [@DucNgVan](https://github.com/DucNgVan)
- **Email**: contact.developer@example.com
- **LinkedIn**: [Nguyen Van Duc](https://linkedin.com/in/ducngvan)

---

<div align="center">
  <sub>Được thiết kế và lập trình với ❤️ bởi <b>Nguyen Van Duc</b>. Tặng kèm giấy phép <a href="./LICENSE">MIT License</a>.</sub>
</div>
