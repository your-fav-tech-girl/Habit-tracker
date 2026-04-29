# Habit Tracker PWA

A mobile-first Progressive Web App (PWA) for tracking daily habits with authentication, streak tracking, and offline support using localStorage.

---

# Project Overview

Habit Tracker is a client-side PWA built with Next.js, React, TypeScript, and Tailwind CSS. It allows users to:

* Sign up and log in with email/password
* Create, edit, and delete habits
* Track daily completion of habits
* View current streaks
* Persist data locally in the browser
* Work offline after initial load (PWA support)

This project is fully local-first and does not use any backend or external database.

---

# Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* localStorage (persistence)
* Vitest (unit + integration tests)
* React Testing Library
* Playwright (E2E tests)

---

# Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

# Run Instructions

### Start production build

```bash
npm run build
npm run start
```

---

# Test Instructions

### Run all tests

```bash
npm run test
```

### Unit tests only

```bash
npm run test:unit
```

### Integration tests only

```bash
npm run test:integration
```

### End-to-end tests

```bash
npm run test:e2e
```

---

# Local Persistence Structure

The app uses `localStorage` with the following keys:

### 1. Users

```ts
habit-tracker-users
```

Stores:

```ts
{
  id: string;
  email: string;
  password: string;
  createdAt: string;
}[]
```

---

### 2. Session

```ts
habit-tracker-session
```

Stores:

```ts
{
  userId: string;
  email: string;
} | null
```

---

### 3. Habits

```ts
habit-tracker-habits
```

Stores:

```ts
{
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: 'daily';
  createdAt: string;
  completions: string[];
}[]
```

Each user only sees their own habits filtered by `userId`.

---

# PWA Implementation

The app supports basic Progressive Web App features:

### 1. Manifest

* Defined in `public/manifest.json`
* Includes:

  * App name
  * Icons (192x192, 512x512)
  * Theme colors
  * Start URL

### 2. Service Worker

* Located in `public/sw.js`
* Caches app shell on first load
* Enables offline access to previously loaded pages
* Prevents hard crashes when offline

### 3. Offline Behavior

* App shell loads from cache if network is unavailable
* Data remains available via localStorage

---

# Test Coverage Mapping

## Unit Tests

### `tests/unit/slug.test.ts`

* Verifies habit name slug generation
* Ensures formatting rules (lowercase, hyphens, cleanup)

### `tests/unit/validators.test.ts`

* Validates habit name input rules
* Ensures empty and length constraints are enforced

### `tests/unit/streaks.test.ts`

* Tests streak calculation logic
* Ensures consecutive days are counted correctly
* Ensures duplicates and gaps are handled properly

### `tests/unit/habits.test.ts`

* Tests habit completion toggling logic
* Ensures immutability
* Ensures no duplicate completions

---

## Integration Tests

### `tests/integration/auth-flow.test.tsx`

* Tests signup flow creates session
* Detects duplicate email signup errors
* Tests login authentication
* Validates invalid login behavior

### `tests/integration/habit-form.test.tsx`

* Tests habit creation flow
* Validates form validation errors
* Tests editing habits
* Tests deletion confirmation
* Tests completion + streak update flow

---

## End-to-End Tests (Playwright)

### `tests/e2e/app.spec.ts`

* Splash screen displays and redirects correctly
* Auth redirects work properly
* Protected dashboard access enforced
* Full signup flow works
* Full login flow works
* Habit creation works
* Habit completion updates streak
* Session persists after reload
* Logout redirects correctly
* Offline app shell loads after caching

---

# Summary

This project demonstrates:

* Local-first app 
* Deterministic state management
* Test-driven frontend design
* PWA fundamentals
* Clean React component structure

---

# End of README


