# Idea Drop — Frontend (Beginner Friendly)

Welcome! This is the frontend (UI) for Idea Drop. This README explains how to run the app and where to find the important files. It assumes you are new to web projects — no worries, the steps are short and simple. ✅

---

## Quick setup (3 steps)

1. Install dependencies:

```bash
npm install
```

2. Start the app in development mode (opens at http://localhost:3000 by default):

```bash
npm run dev
# or
npm run start
```

3. (Optional) If you want a mock backend, run the included json-server:

```bash
npm run json-server
# mock API will run at http://localhost:8000
```

---

## Useful scripts (what they do)

- `npm run dev` / `npm run start` — run the app in development using Vite.
- `npm run build` — build the app for production.
- `npm run serve` — preview the built app locally.
- `npm run test` — run tests (Vitest).
- `npm run json-server` — start a simple local mock API using `src/data/db.json`.

---

## What is inside this project? (short guide)

- `src/` — main source code (React + TypeScript).
  - `src/main.tsx` — app entry point.
  - `src/routes/` — file-based routes (this project uses TanStack Router).
  - `src/components/` — reusable UI components (e.g., `Header`, `IdeaCard`).
  - `src/api/` and `src/lib/` — helper code for requests and auth.
  - `src/data/db.json` — a local sample database used by `json-server`.

- `index.html`, `package.json`, `vite.config.ts` — config files.

---

## How to add a new page (simple)

This project uses file-based routing. To add a page:

1. Create a new file under `src/routes/` (for example `src/routes/about/index.tsx`).
2. Add a React component as the default export.
3. Use `<Link to="/your-path">` to navigate.

Example:

```tsx
import { Link } from "@tanstack/react-router";

export default function About() {
  return <div>About page — <Link to="/">Go home</Link></div>;
}
```

---

## Styling

This app uses Tailwind CSS. You can edit styles in `src/styles.css` or add classes directly in JSX.

---

## Working with the backend

You can use the provided mock server (`npm run json-server`) or run the real backend in the `idea-drop-api` folder (if available). The UI expects an API that provides ideas and user auth.

If you are not sure which to use, start with the mock server — it is fastest for learning.

---

## Tests

Run the tests with:

```bash
npm run test
```

Tests use Vitest. As a beginner, you can run tests to check if basic parts of the app still work after your changes.

---

## Troubleshooting (common issues)

- Port already in use: change the port or stop the process using it.
- Missing dependency errors: run `npm install` again.
- If the UI can’t reach the API, make sure `json-server` or your backend is running.

---

## Learn more / links

- Project docs: check source files under `src/`.
- TanStack Router: https://tanstack.com/router
- Vite: https://vitejs.dev/
- Tailwind: https://tailwindcss.com/

---

If you want, I can also:
- Add a short CONTRIBUTING section to explain how to make a pull request.
- Add quick screenshots or a short demo GIF to the README.

Happy coding! 🎉
