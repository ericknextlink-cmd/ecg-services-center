# ECG Vendor Registration & Certification System

Next.js 16 + shadcn/ui prototype of the Electricity Company of Ghana vendor portal.

## Screens mapped from the source designs

- **Landing** (`/`) — public marketing site
- **Login / Signup** (`/login`, `/signup`) — company account
- **App dashboard** (`/app/dashboard`) — start External Licence, Classification Certificate, or Supplier registration
- **Classification data** — category 1–5 and class A–E score bands, used in the classification application and Resources

Appearance modes: **Light**, **Warm**, and **Dark** (header control inside the app).

## Run locally

This project uses **pnpm**.

```bash
cd /Volumes/PATRICK-512/PROJECTS/ecg-vendor-portal
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Auth is local-only for this phase (browser `localStorage`). Sign up, sign in, or use **Continue with demo account**.
