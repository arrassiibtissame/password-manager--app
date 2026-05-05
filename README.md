<div align="center">

# 🔐 PassVault

### *One key for everything*

**A secure, modern, full-stack password manager — built from scratch with React, Node.js, MongoDB and Docker.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-9b59f7?style=for-the-badge)](https://passvault-frontend-ayhw.onrender.com)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ed?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![Deployed on Render](https://img.shields.io/badge/Deployed_on-Render-46e3b7?style=flat-square&logo=render&logoColor=white)](https://render.com)

</div>

---



## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Docker Setup](#docker-setup)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Author](#author)

---

## Overview

PassVault is a full-stack password manager that lets users securely store, manage and generate passwords from any device. Built with a glassmorphism dark UI design, JWT authentication, encrypted password storage, a responsive mobile-first layout, and fully containerized with Docker for production deployment.

> 🔗 **Live:** [passvault-frontend-ayhw.onrender.com](https://passvault-frontend-ayhw.onrender.com)

---

## ✨ Features

### 🔐 Authentication
- Secure register and login with **JWT tokens** (7-day expiry)
- Passwords hashed with **bcryptjs**
- Token persisted in localStorage and attached to every API request automatically
- Protected routes — unauthenticated users redirected to login
- User session restored on page refresh

### 🗝️ Password Management
- **Add** passwords with title, site, username and password
- **Edit** existing passwords via an animated modal
- **Delete** passwords with toast confirmation
- **Show / hide** password toggle per card
- **One-click copy** to clipboard with visual checkmark confirmation
- **Real-time search** — filter by title or site as you type
- **Responsive grid layout** — adapts from multi-column on desktop to single column on mobile

### ⚡ Password Generator
- Generate cryptographically random passwords instantly
- **Adjustable length** 8–32 characters via a smooth slider
- **Toggle character sets:** uppercase, lowercase, numbers, symbols
- **Live strength meter** — 5-bar indicator (Very weak → Very strong)
- One-click copy to clipboard with toast notification

### 🎨 UI & Design
- **Glassmorphism** design — dark background, purple accents, frosted glass cards
- **Framer Motion** animations throughout — page transitions, card entrances, modal reveals
- **Animated splash screen** — pulsing logo, progress bar, floating background blobs
- **Toast notifications** for every user action
- Consistent **PassVault branding** across all pages

### 📱 Fully Responsive
- **Desktop:** Collapsible sidebar with logo, nav links and logout
- **Mobile:** Fixed bottom navigation bar (Instagram-style)
- **Tablet:** Adapted 2-column grid, narrowed sidebar
- Touch-friendly tap targets (44px minimum)
- Modals slide up from bottom on mobile (native sheet pattern)
- iPhone safe area / home indicator support

### 🔒 Security
- JWT authentication with secure token expiry
- Passwords encrypted before storing in MongoDB
- Environment variables never exposed to the client
- CORS restricted to production domains only
- Docker secrets injected at runtime, never baked into images

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 8 | Build tool |
| React Router DOM | 7 | Client-side routing |
| Framer Motion | 11 | Animations & transitions |
| Axios | 1.15 | HTTP client with interceptors |
| React Hot Toast | 2 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 | Runtime environment |
| Express | 5 | REST API framework |
| MongoDB Atlas | — | Cloud database |
| Mongoose | 9 | ODM / schema modeling |
| bcryptjs | 3 | Password hashing |
| jsonwebtoken | 9 | JWT authentication |
| dotenv | 17 | Environment variables |
| cors | 2 | Cross-origin requests |

### DevOps & Deployment
| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Static file serving + API reverse proxy |
| Render | Cloud deployment (frontend + backend) |
| MongoDB Atlas | Managed cloud database |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│           https://passvault-frontend-ayhw.onrender.com      │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                 Nginx (Frontend Container)                   │
│   • Serves React static files (HTML / CSS / JS)             │
│   • Handles React Router client-side routing                │
│   • Caches static assets (1 year)                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│              React App (Built with Vite)                    │
│   Splash → Login / Register → Dashboard → Passwords        │
│   AuthContext  •  ProtectedRoutes  •  Axios interceptors    │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS API calls
┌──────────────────────────▼──────────────────────────────────┐
│           Express REST API — Node.js 20                     │
│   https://passvault-backend-gfrr.onrender.com               │
│   • /api/auth  (register, login, me)                        │
│   • /api/passwords  (CRUD)                                  │
│   • JWT middleware on protected routes                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ Mongoose ODM
┌──────────────────────────▼──────────────────────────────────┐
│                   MongoDB Atlas                             │
│              Cloud Database (free tier)                     │
│          Users collection + Passwords collection            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account (free tier)
- Docker Desktop (optional, for containerized setup)

### Local Development

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/password-manager-app.git
cd password-manager-app
```

**2. Setup backend**
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
SECRET_KEY=your_32_character_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key
```

Start backend:
```bash
npm start
```

**3. Setup frontend**
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## 🐳 Docker Setup

### Run with Docker Compose

**1. Create `.env` at project root:**
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
SECRET_KEY=your_32_character_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key
```

**2. Build and start:**
```bash
docker compose up --build
```

App available at `http://localhost`

### Docker commands
```bash
# Start without rebuilding
docker compose up

# Run in background
docker compose up -d

# Stop everything
docker compose down

# Rebuild after changes
docker compose up --build

# View logs
docker logs passvault-backend
docker logs passvault-frontend

# Open shell in container
docker exec -it passvault-backend sh
```

### Container overview
| Container | Base Image | Port | Role |
|---|---|---|---|
| passvault-frontend | nginx:alpine | 80 | Serves React + handles routing |
| passvault-backend | node:20-alpine | 3000 | Express REST API |

### Multi-stage build
The frontend uses a **2-stage Docker build**:
- **Stage 1 (builder):** Node.js 20 installs dependencies and runs `vite build`
- **Stage 2 (serve):** Clean Nginx image serves only the compiled static files

This keeps the final image small and secure — no Node.js, no source code, no `node_modules` in production.

---

## ☁️ Deployment

Deployed on **Render** using Docker:

| Service | URL |
|---|---|
| 🌐 Frontend | [passvault-frontend-ayhw.onrender.com](https://passvault-frontend-ayhw.onrender.com) |
| ⚙️ Backend | [passvault-backend-gfrr.onrender.com](https://passvault-backend-gfrr.onrender.com) |
| 🗄️ Database | MongoDB Atlas (cloud) |

### Deploy your own instance

**1. Push to GitHub**

**2. Create two Web Services on Render:**

Backend:
- Root directory: `backend`
- Environment: `Docker`
- Add all `.env` variables

Frontend:
- Root directory: `frontend`
- Environment: `Docker`
- Add: `VITE_API_URL=https://your-backend.onrender.com/api`

**3. Update CORS in `backend/server.js`** with your frontend URL

---

## 📁 Project Structure

```
password-manager-app/
├── docker-compose.yml
├── .gitignore
├── README.md
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── server.js
│   ├── package.json
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Password.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── Passwords.js
│   └── utils/
│       └── encryption.js
│
└── frontend/
    ├── Dockerfile
    ├── .dockerignore
    ├── nginx.conf
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/
        │   └── axios.js
        ├── context/
        │   └── AuthContext.jsx
        ├── routes/
        │   ├── AppRoutes.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── Splash.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   └── Passwords.jsx
        ├── components/
        │   ├── Logo.jsx
        │   ├── layout/
        │   │   ├── Layout.jsx
        │   │   ├── Navbar.jsx
        │   │   ├── Sidebar.jsx
        │   │   └── BottomNav.jsx
        │   └── passwords/
        │       ├── PasswordCard.jsx
        │       ├── PasswordList.jsx
        │       ├── PasswordForm.jsx
        │       └── PasswordModal.jsx
        └── styles/
            └── global.css
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Passwords
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/passwords` | Get all passwords | ✅ |
| POST | `/api/passwords` | Add new password | ✅ |
| PUT | `/api/passwords/:id` | Update password | ✅ |
| DELETE | `/api/passwords/:id` | Delete password | ✅ |

### Authentication header
```
Authorization: Bearer <jwt_token>
```

---

## 👩‍💻 Author

<div align="center">

**Ibtissame Arrassi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ibtissame_Arrassi-0077b5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/ibtissame-a-87a851306)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/YOUR_USERNAME)
[![Live Demo](https://img.shields.io/badge/Live_Demo-PassVault-9b59f7?style=flat-square)](https://passvault-frontend-ayhw.onrender.com)

</div>

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>⭐ If you found this project useful, please give it a star!</p>
  <p>Built with ❤️ by <strong>Ibtissame Arrassi</strong></p>
  <p>🔐 <em>PassVault — One key for everything</em></p>
</div>
