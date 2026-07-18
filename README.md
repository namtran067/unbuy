# SAIGONXUA — Anti-Marketing Jewelry E-commerce Platform

SAIGONXUA (formerly CLARITY) is a transparent, anti-marketing jewelry e-commerce website designed to empower buyers with honest, unfiltered advice. Instead of selling artificial scarcity and marketing illusions, SAIGONXUA decodes marketing tricks, highlights potential caveats for each piece, and recommends natural/lab-grown jewelry matching your real needs.

---

## 🌟 Key Features

1. **AI-Driven Anti-Marketing Analyzer**
   - Evaluates the entire product catalog based on user inputs (Budget, Material, Occasion, and detailed Needs).
   - Classifies products into:
     - **NÊN MUA (Recommended)**: Ranked by suitability, highlighting why it fits and any minor caveats.
     - **KHÔNG NÊN MUA (Avoid)**: Products that fail to meet criteria or exceed budget, complete with severity levels (`high`, `medium`, `low`).
   - Searches the live web for alternative products from major Vietnamese and global brands (PNJ, DOJI, Jemmia, Tiffany, Lightbox, etc.) if the catalog doesn't have a perfect match.

2. **Personalized Product Reviews**
   - Click on any product to see its standard technical specifications, honest verdicts, and why-not-to-buy reasons.
   - Click "Phân tích AI theo nhu cầu" to dynamically rewrite the review and reasons not to buy based on your custom requirements.

3. **Secure Admin Dashboard**
   - Accessed via a hardcoded password gate: `saigonxua-admin-2025`.
   - Allows administrators to directly edit anti-marketing fields: honest verdicts, severity-tagged warnings, target budgets, and competitor alternative recommendations.
   - Updates the SQLite database instantly through custom PUT endpoints.

4. **Premium Minimalist Design**
   - Clean, luxury aesthetic using a warm cream and bronze-gold palette (utilizing Tailwind CSS v4 and custom OKLCH colors).
   - Designed to feel elegant, premium, and focused on readability.

---

## 🛠️ Technical Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4, PostCSS, Radix UI & Shadcn, Framer Motion
- **Database**: SQLite & Prisma ORM
- **AI Engine**:
  - `z-ai-web-dev-sdk` (for deep context chat + real-time google web search)
  - OpenRouter API (Gemini 2.5 Flash Lite) for custom single-product reviews

---

## 📂 Codebase Architecture

```
├── prisma/
│   ├── schema.prisma   # SQLite Database Schema
│   └── seed.ts         # Pre-configured seed data (16 products)
├── db/
│   └── custom.db       # Main SQLite Database
├── src/
│   ├── app/
│   │   ├── api/        # REST Endpoints
│   │   │   ├── admin/           # Admin product update
│   │   │   ├── ai/              # Personalized single-product AI analyzer
│   │   │   ├── anti-marketing/  # Catalog-wide recommendations and web search
│   │   │   └── products/        # Fetch products list & details
│   │   ├── globals.css # Light luxury stylesheet
│   │   ├── layout.tsx  # Root Layout (Fonts, toast configurations)
│   │   └── page.tsx    # Main Landing page & client orchestration
│   ├── components/
│   │   ├── site/       # Custom business logic components (Analyzer, Admin, Product details)
│   │   └── ui/         # Shadcn base primitives (Dialog, Slider, Toast, etc.)
│   ├── lib/
│   │   ├── admin.ts    # Admin auth utilities and X-Admin-Key management
│   │   ├── db.ts       # Prisma Client instantiator
│   │   ├── format.ts   # Formatter helpers (Currency, numbers)
│   │   └── types.ts    # Shared TypeScript interfaces & JSON parsers
└── public/
    └── products/       # Generated jewelry images
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have **Node.js (v23+)** and **npm** installed on your machine.
Verify your versions:
```bash
node -v
npm -v
```

### 2. Environment Configuration
Create a `.env` file in the root directory and add the following keys. A populated `.env` is already configured in the workspace:
```ini
DATABASE_URL=file:/Users/nam/Data/Jemmia/github/unby/db/custom.db
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
```

### 3. Generate the Prisma Client
Run the Prisma generator to construct types and client APIs locally:
```bash
npm run db:generate
```

### 4. Run the Development Server
Start Next.js local server:
```bash
npm run dev
```
The application will start running on **http://localhost:3000**.
Accessing this address in your web browser will load the SAIGONXUA jewelry anti-marketing web application.

---

## 🗃️ Database Operations

The SQLite database (`db/custom.db`) is already pre-seeded with **16 products** including diamond rings, 24k gold chains, Akoya pearls, rose gold charms, and more.

If you ever wish to modify, reset, or reseed the database, you can use the following commands:
- **Sync DB schema**:
  ```bash
  npm run db:push
  ```
- **Reset and migrate**:
  ```bash
  npm run db:reset
  ```
- **Manually seed the database**:
  Since `prisma/seed.ts` is written in TypeScript, you can execute it using `npx tsx` or `npx ts-node`:
  ```bash
  npx tsx prisma/seed.ts
  ```

---

## 🐳 Docker Deployment (Optional)

If you prefer to run the project in a containerized environment matching production:

1. **Build and run container**:
   ```bash
   docker-compose up --build
   ```
2. **Access local server**:
   Open **http://localhost:3000**.
   The container automatically sets up and maps `/data/custom.db` volume to store product changes persistently.
