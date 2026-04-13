# 📝 MEMO - Notes Web Application

A full-featured notes management web app built with Next.js 15 and React 19. Connects to a custom [REST API backend](https://github.com/Ihor-Kotliarevskyi/nodejs-hw) for data persistence and authentication.

🌐 **Live Demo:** [https://memo-note-hub.vercel.app](https://memo-note-hub.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5-433E38?style=flat)](https://zustand-demo.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## ✨ Features

- 🔐 **Authentication** - Sign up, sign in, sign out with JWT stored in HTTP-only cookies
- 🔄 **Token Auto-Refresh** - Next.js middleware silently renews expired access tokens via refresh token
- 🛡️ **Route Protection** - Private routes redirect unauthenticated users; auth routes redirect logged-in users
- 📋 **Notes CRUD** - Create, view, update, and delete personal notes
- 🏷️ **Tag Filtering** - Filter notes by category using a dynamic sidebar
- 🔍 **Debounced Search** - Full-text search with debounce to reduce unnecessary API calls
- 📄 **Pagination** - Navigate through notes pages with `react-paginate`
- 🖼️ **Intercepting Routes + Modal** - Note preview opens in a modal when navigating from the list, or as a full page on direct URL access (Next.js parallel + intercepting routes)
- 💾 **Draft Persistence** - Note draft is saved to `localStorage` via Zustand `persist` middleware — survives page refresh
- 👤 **Profile Management** - View and edit user profile (username, avatar)
- 🔔 **Toast Notifications** - User feedback on all async actions via `react-hot-toast`

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS Modules |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 |
| Forms | Formik + Yup |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Fonts | Google Fonts (Roboto) |

---

## 📂 Project Structure

```
app/
├── (auth routes)/          # Sign in / Sign up pages
├── (private routes)/
│   ├── notes/
│   │   ├── filter/         # Notes list with tag sidebar + catch-all slug routing
│   │   │   └── @sidebar/   # Parallel route: sidebar
│   │   ├── [id]/           # Full-page note detail
│   │   └── action/create/  # Create note page
│   └── profile/            # Profile view + edit
├── @modal/                 # Parallel route: note preview modal
│   └── (.)notes/[id]/      # Intercepting route for modal
├── api/                    # Next.js Route Handlers (BFF proxy layer)
│   ├── auth/               # login, logout, register, session
│   ├── notes/              # GET (list), POST, PATCH, DELETE
│   └── users/me/           # GET, PATCH profile
└── layout.tsx              # Root layout with providers

components/                 # Reusable UI components
lib/
├── api/                    # clientApi / serverApi / base api instance
└── store/                  # Zustand stores: authStore, noteStore (draft)
types/                      # TypeScript interfaces: Note, User
constants/                  # Note tags enum
proxy.ts                    # Next.js middleware for auth route protection
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `v18+`
- Running instance of the [Notes API backend](https://github.com/Ihor-Kotliarevskyi/nodejs-hw)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Ihor-Kotliarevskyi/MEMO-note-hub.git
cd MEMO-note-hub

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend URL

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001   # Backend API base URL
```

---

## 🏗️ Architecture Notes

**BFF (Backend for Frontend) pattern** — the app uses Next.js Route Handlers as a proxy layer between the React client and the external REST API. This keeps API credentials and cookies server-side, and avoids CORS issues.

**Parallel + Intercepting Routes** — note preview uses Next.js's `@modal` parallel route with an intercepting route `(.)notes/[id]`. Clicking a note from the list shows a modal; navigating directly to the URL renders the full page.

**Token Refresh in Middleware** — `proxy.ts` checks for a missing `accessToken` cookie on every protected route. If a `refreshToken` exists, it silently calls the backend to get a new access token before the page renders.

---

## 🧪 Available Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔗 Related

- **Backend API:** [nodejs-hw](https://github.com/Ihor-Kotliarevskyi/nodejs-hw) — Express.js REST API this app connects to

---

## 📝 What I Learned

- Building a full-stack app with Next.js App Router: layouts, parallel routes, intercepting routes, and Route Handlers
- Implementing a BFF proxy pattern to handle auth cookies securely on the server
- Managing server state with TanStack Query v5 (mutations, cache invalidation, query keys)
- Managing client state and draft persistence with Zustand + persist middleware
- Protecting routes with Next.js Middleware and silent token refresh logic
- Separating client and server API layers (`clientApi` vs `serverApi`) in a Next.js project

---

<p align="center">Made with ☕ by <a href="https://github.com/Ihor-Kotliarevskyi">Ihor Kotliarevskyi</a></p>
