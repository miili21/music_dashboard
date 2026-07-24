# 🎵 Power Cloud — Music Artist Dashboard

**Power Cloud** is a analytics dashboard designed for music artists, record labels, and management teams. It provides real-time visualization of revenue, streaming metrics (Spotify, YouTube, Apple Music), active vs. deep catalog performance, and deep exploration tools for artists, albums, and tracks.

---

## 📋 Table of Contents

1. [Name & General Description](#1-name--general-description)
2. [How to Run Locally](#2-how-to-run-locally)
3. [Technology Choices & Rationale](#3-technology-choices--rationale)
4. [Assumptions Made](#4-assumptions-made)
5. [Features Implemented](#5-features-implemented)
6. [Future Improvements](#6-future-improvements)

---

## 1. Name & General Description

* **Application Name:** `Power Cloud`
* **Description:** A music analytics dashboard for artists and the music industry. The platform allows users to monitor global and individual artist performance, analyze revenue breakdowns by format (Streaming vs. Physical) and catalog type (Frontline vs. Deep Catalog), explore complete discographies with detailed song-level metrics, and manage personalized favorite artists.

---

## 2. How to Run Locally

### Prerequisites

* **Node.js**: `v18.0.0` or higher (recommended `v20+`)
* **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`

### Installation & Execution Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/power-cloud.git
   cd power-cloud
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   Copy the example environment file to configure local variables (if applicable):
   ```bash
   cp .env.example .env
   ```
   *Note: For local development, required keys are either dynamically configured or use safe fallbacks.*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available by default at [http://localhost:3000](http://localhost:3000).

5. **Build for production:**
   ```bash
   npm run build
   ```
   To preview the compiled build:
   ```bash
   npm run preview
   ```

##Open app in browser:
https://power-cloud-umber.vercel.app/

---

## 3. Technology Choices & Rationale

| Technology | Role | Rationale |
| :--- | :--- | :--- |
| **React 19** | UI Library | Delivers an ultra-efficient rendering engine, hook-based modular architecture, and smooth state management for complex, interactive dashboards. |
| **TypeScript** | Programming Language | Provides strict static typing, editor autocompletion, and compile-time error prevention when working with complex data models (Artists, Albums, Tracks, KPIs). |
| **Vite** | Build Tool & Bundler | Offers an extremely fast development server with instant Hot Module Replacement (HMR) and optimized production compilation. |
| **Tailwind CSS v4** | Styling Framework | Enables utility-first high-performance styling, native CSS variables, responsive layout breakpoints (`sm`, `md`, `lg`), and modern visual effects (glassmorphism, neon glows, gradients). |
| **Motion (`motion/react`)** | Animation Engine | Ensures 60fps page transitions, smooth entrance animations, and interactive vinyl record rotation responding to player state. |
| **Recharts** | Data Visualization | Specialized library for rendering area, bar, and distribution charts with custom tooltips and accessible color gradients. |
| **Lucide React** | Iconography | Provides a complete suite of clean, consistent, and lightweight vector icons customizable via CSS. |
| **Express** | Backend / Node Server | Serves the production build and provides server-side API proxying to keep private service keys secure. |

---

## 4. Assumptions Made

* **Runtime Environment:** Assumes the user executes the application in a Node.js `v18+` environment supporting ES Modules (`"type": "module"`).
* **Data Sources:** Assumes streaming and sales metrics are fed from structured TypeScript models (`/src/data/`), simulating responses from Spotify for Artists, YouTube Analytics, and Apple Music API to ensure zero latency and full uptime without API rate limits during evaluation.
* **Initial Application State:** When launching the app for the first time, **no artist is pre-selected by default on the console**. This allows users to view high-level global metrics before diving into a specific artist profile.
* **Favorites Management:** Favoriting an artist is performed directly within the detailed artist profile view (`Add to Favs` / `Favorited`), keeping the main dashboard focused on general catalog overview.
* **Responsive Compatibility:** Assumes interaction across modern browsers on desktop, tablet, and mobile, with responsive layouts adapting across all breakpoints.

---

## 5. Features Implemented

* 🎧 **Hero / Welcome Screen ("WelcomeScreen"):**
  - Centered display typography in Helvetica (`power cloud`).
  - Scaled conic-gradient vinyl record trio cropped at the bottom (`overflow-hidden`), creating an immersive 3D aesthetic.
  - Audio preview control button to play/pause vinyl rotation, and smooth scroll hint down to the main dashboard.

* 📊 **Global Dashboard & Key KPIs:**
  - High-level metrics: Conversion rate, Subscription earnings, and Net benefits.
  - Featured "cloud" Albums section combining editorial serif titles with interactive circular cards.
  - Top 5 Artists carousel with ranking positions and growth indicators.

* 📈 **Advanced Analytics Visualizations:**
  - **Active vs. Historical Catalog:** Interactive area charts comparing recent releases (< 18 months) against deep catalog streams.
  - **Physical vs. Digital Revenue:** Revenue comparison breakdown across offline formats (vinyl, CD, merch) versus digital streaming by audience profile.

* 👤 **Detailed Artist Profile (`ArtistProfileView`):**
  - Custom hero header with artist photography, bio, global metrics, and an **Add to Favorites** button accessible right from their profile.
  - 3-year historical revenue breakdown categorized by Merch, Live Shows, Album Sales, and Digital Streaming.

* 🎵 **Song Overview (`SongsOverview`) & Track Profile (`SongProfileView`):**
  - **Global Song Explorer:** Interactive catalog list featuring search, artist filtering, and sorting by popularity or stream count.
  - **Track Technical Sheet:** Dedicated view for individual tracks featuring real-time audio player, multi-channel metrics breakdown (Spotify Likes, YouTube Views, Apple Music Streams), track revenue breakdown, and User-Generated Content (UGC) indicators.

* 💿 **Discography View & Album Profile (`AlbumProfileView`):**
  - **Album Explorer:** Full discography browser with high-resolution cover artwork and release details.
  - **Album Profile:** Detailed view for each production featuring a tracklist player, interactive sidebar (`AlbumSongsSidebar`), global stream metrics, physical vs. digital sales split, and instant track playback controls.

* 🌐 **Global Audience Heatmap:**
  - Geographic visualization showing listener density and stream distribution by region.

* 🌐 **Bilingual Support (Spanish / English):**
  - Real-time language selector (`ES` / `EN`) that instantly translates navigation, chart labels, buttons, and metrics.

---

## 6. Future Improvements

1. **Official Real-Time API Integrations:**
   - Connect webhooks and OAuth2 authorization flows to pull live analytics directly from **Spotify for Artists**, **Apple Music API**, **YouTube Analytics**, and **SoundCloud API**.

2. **Automated Testing Suite:**
   - Implement unit and component tests using **Vitest** and **React Testing Library**.
   - Add End-to-End (E2E) testing with **Playwright** or **Cypress** for critical user journeys (profile navigation, favoriting, audio playback).

3. **Financial & Analytics Report Exporting:**
   - Enable PDF and CSV report generation with royalty calculations and regional performance breakdowns.

4. **Persistent Audio Player:**
   - Build a persistent footer audio bar that continues track playback uninterrupted while navigating across different pages and profiles.


