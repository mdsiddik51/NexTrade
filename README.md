# LexVizo — Premium Full-Stack Legal Services Hub

A complete, production-ready legal consultation hub designed to bridge the gap between premium clients and verified legal practitioners. Built with a modern TypeScript monorepo architecture, matching high-end design aesthetics and secure protocols.

## 🚀 Technology Stack

### Frontend (`/client`)
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (Mandatory strict typings)
- **Styling:** Tailwind CSS (Premium dark luxury theme)
- **Authentication:** Better Auth (Google social login & Email/Password schemas)
- **Icons:** Lucide React

### Backend (`/server`)
- **Framework:** Node.js & Express.js
- **Language:** TypeScript
- **Database:** MongoDB (using native `mongodb` driver & Better Auth adapters)

---

## 💎 Design System & UX Standards
- **Color Palette:** 3 Primary colors - Deep Void Black (`#0A0B0D`), Luxurious Amber (`#FF9500`), White (`#F3F4F6`).
- **Responsive Layout:** Dynamic fluid design optimized for desktop (4 columns on listing grid), tablet, and mobile screens.
- **Loading UX:** Animated skeleton loaders prevent layout shifts during async fetching.
- **Demo Access:** Quick Autofill Client / Lawyer buttons integrated directly in the Login Portal.

---

## 📂 Project Architecture

```bash
├── client/                 # Next.js Frontend Application
│   ├── app/                # App Router Routes (Home, Explore, Details, Add, Manage, Blog, Contact, Privacy, Terms)
│   ├── components/         # Reusable layouts (Navbar, Footer, Skeleton Loaders)
│   ├── lib/                # Shared utilities, Better Auth configuration, static data fallbacks
│   └── tsconfig.json       # Strict TypeScript configuration
├── server/                 # Express.js Backend Server
│   ├── src/                # Backend entry point (server.ts)
│   └── tsconfig.json       # Node.js target TypeScript configuration
└── .gitignore              # Monorepo git configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Local or Cloud MongoDB Instance

### 1. Backend Server Setup
```bash
cd server
npm install
npm run dev
```
The server will boot on `http://localhost:8080`.

### 2. Frontend Client Setup
1. Create a `.env` file inside `/client` directory based on the env guidelines.
2. Initialize and run Next.js:
```bash
cd client
npm install
npm run dev
```
The client will run on `http://localhost:3000`.

---

## ⚖️ License
Licensed under the ISC License. © 2026 LexVizo Networks. All rights reserved.
