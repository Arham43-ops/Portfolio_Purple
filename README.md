# 🌌 Ultra-Premium Portfolio Showcase

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Portfolio Banner" width="100%" />
  
  <p align="center">
    <strong>Arham Topiwala | BSc IT Graduate & Full-Stack Developer</strong>
  </p>

  <p align="center">
    A futuristic, high-performance portfolio featuring 3D environments, interactive shaders, and premium UI micro-interactions.
  </p>
</div>

---

## ✨ Features

### 💎 Certificates Gallery (Ultra-Premium)
The certificates page has been transformed into a high-end digital showcase:
- **Reactive 3D Background**: Immersive floating geometry and particles that respond to mouse movement and scroll parallax.
- **Spotlight Interaction**: Cards feature a dynamic radial light effect that tracks the cursor position.
- **Glass-Shine Animation**: Sophisticated sweeping light effects on hover for a premium "glassmorphic" feel.
- **Magnetic Glitch UI**: Hero titles with magnetic pull physics and digital glitch effects.
- **Quick Preview Modal**: Instant, full-page credential viewing with integrated PDF previews.

### 🚀 Technical Stack
- **Core**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **3D Engine**: Three.js + @react-three/fiber + @react-three/drei
- **Icons**: Lucide React
- **Animations**: Custom Spring Physics & GSAP-inspired transitions

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **NPM** or **Yarn**

### Quick Start
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Arham43-ops/Portfolio_Purple.git
   cd Purple
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Generate Certificate Data**:
   The portfolio dynamically scans the `public/Certificates` directory to build its showcase.
   ```bash
   node gen-certs.js
   ```

4. **Environment Configuration**:
   Create a `.env` file and add your Gemini API Key (if applicable):
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   ```

5. **Launch Development Server**:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

- `src/pages/Certificates.tsx`: The primary high-end showcase component.
- `gen-certs.js`: Automation script for managing certificate assets.
- `public/Certificates/`: Directory for storage of PDF credentials.
- `src/index.css`: Custom premium design tokens and utility classes.

---

<div align="center">
  <p>Built with 💜 by Arham Topiwala</p>
</div>
