# NexTrade — Premium Full-Stack Financial Asset Tracker

NexTrade is a premium full-stack, real-time financial asset tracker and dashboard designed to explore, analyze, list, and manage portfolios containing traditional equities, cryptocurrencies, ETFs, commodities, bonds, forex, and real estate. Built using a modern TypeScript architecture, matching high-end design aesthetics (Luxurious Amber and Deep Void styling), and implementing secure protocols.

---

## 🚀 Key Features

* **Live Market Aggregation:** Explore over 2,400+ verified listings categorized across 6 primary asset classes.
* **Dynamic Client-Server Architecture:** Seamless Express.js endpoints backed by MongoDB native collections for real-time querying, pagination, and sorting.
* **Unified Portfolio Management:** Analysts can list assets, edit metadata, track status availability, and manage listings dynamically in their portfolios.
* **Secure Session Authentication:** Integrated with `Better Auth` for secure OAuth (Google) and Email/Password flows, sharing the same aligned MongoDB instance.
* **Premium UX/UI Design:** Custom skeleton loaders, HSL color harmony, and fluid layout responsiveness (1 to 4 columns adaptively).

---

## 📂 Project Architecture

```text
assignment-1/
├── client/                 # Next.js Frontend Application
│   ├── app/                # Next.js App Router Pages
│   │   ├── about/          # Platform introduction & mission
│   │   ├── api/auth/       # Better Auth Next.js handlers
│   │   ├── auth/           # Login and Registration pages
│   │   ├── blog/           # Finance articles and market logs
│   │   ├── contact/        # Customer feedback & communication
│   │   ├── explore/        # Paginated asset grid with search/filter/sort
│   │   ├── help/           # Platform documentation & FAQ lists
│   │   ├── items/          
│   │   │   ├── add/        # Interactive listing form for new assets
│   │   │   └── manage/     # Portfolio management, updates, and deletes
│   │   ├── privacy/        # Privacy Policy terms
│   │   ├── services/[id]/  # Asset details page with dynamic related assets
│   │   └── terms/          # Terms and Conditions terms
│   ├── components/         # Global Layout Components
│   │   ├── Navbar.tsx      # Responsive header with user profiles & authentication hooks
│   │   └── Footer.tsx      # Comprehensive platform directory footer
│   ├── lib/                # Shared utilities & configurations
│   │   ├── auth.ts         # Better Auth Server-side configurations (MongoDB adapter)
│   │   ├── auth-client.ts  # Better Auth Client React hooks
│   │   ├── data.ts         # In-memory backup fallback datasets
│   │   ├── logger.ts       # Branding-corrected dev logs for tracking errors
│   │   └── types.ts        # Common TypeScript interfaces & category labels
│   ├── package.json        # Next.js dependencies and run scripts
│   └── tsconfig.json       # Next.js TS configurations
│
└── server/                 # Express.js Backend Server
    ├── src/                # Express core files
    │   ├── middleware/     
    │   │   └── validator.ts # Backend request validator middleware
    │   ├── seed.ts         # MongoDB seeder script for initial asset & FAQ datasets
    │   └── server.ts       # Express server boot & MongoDB dynamic REST API endpoints
    ├── package.json        # Express dependencies (jose, dotenv, cors, mongodb, tsx)
    └── tsconfig.json       # Express TS target configuration
```

---

## 🛠️ Local Setup & Installation

Follow these steps to clone, configure, and boot both the backend Express server and the Next.js frontend client locally.

### Prerequisites
* **Node.js** (v18+ recommended)
* **MongoDB** (Cloud Atlas URI or local MongoDB daemon)

---

### 1. Database & Express Backend Server Setup

1. **Configure Environment Variables:**
   Navigate into the `/server` folder and copy `.env.example` to `.env`:
   ```bash
   cd server
   cp .env.example .env
   ```
   Open the `.env` file and define the configuration values:
   ```env
   MONGO_DB_URI=your_mongodb_connection_uri
   DB_CU=nextrade
   ALLOWED_ORIGIN=http://localhost:3000
   PORT=8080
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Seed Initial Database Data:**
   Run the seeding script to populate MongoDB with initial assets, testimonials, categories, stats, and FAQ documents:
   ```bash
   npm run seed
   ```

4. **Boot Server in Development Mode:**
   ```bash
   npm run dev
   ```
   The backend server runs at `http://localhost:8080` (with hot reloading enabled via `tsx watch`).

---

### 2. Frontend Next.js Client Setup

1. **Configure Environment Variables:**
   Navigate into the `/client` folder and copy `.env.example` to `.env`:
   ```bash
   cd ../client
   cp .env.example .env
   ```
   Open the `.env` file and set the configuration parameters:
   ```env
   CLIENT_URI=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   BETTER_AUTH_SECRET=generate_any_secure_random_hash_here
   MONGO_DB_URI=your_mongodb_connection_uri
   DB_CU=nextrade
   NEXT_PUBLIC_API_URL=http://localhost:8080
   GOOGLE_CLIENT_ID=your_optional_google_client_id
   GOOGLE_CLIENT_SEC=your_optional_google_client_secret
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Boot Client in Development Mode:**
   ```bash
   npm run dev
   ```
   The frontend client runs at `http://localhost:3000` (backed by Turbopack compiler).

---

## ⚖️ License
Licensed under the ISC License. © 2026 NexTrade Networks. All rights reserved.
