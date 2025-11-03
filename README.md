
# 🗂️ FloBan — Kanban Board App

A simple Kanban-style task management app built with **Next.js**, **Redux Toolkit**, and **json-server** for mock APIs.

---

## 🖼️ Live Demo

🌐 **App (Vercel):** [https://floban.vercel.app](https://floban.vercel.app)
🧠 **Mock API (Render):** [https://floban.onrender.com](https://floban.onrender.com)

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

You can use **npm**, **yarn**, or **pnpm**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

### 2️⃣ Generate mock data

Before running the app, generate initial mock data for the local API:

```bash
npm run generate-mocks
# or
yarn generate-mocks
# or
pnpm generate-mocks
```

This will populate `mocks/db.json` with fake tasks and columns.

---

### 3️⃣ Run the app

Run both the **Next.js frontend** and the **mock API** together:

```bash
npm run dev:all
# or
yarn dev:all
# or
pnpm dev:all
```

This command:
- Starts the Next.js app at **http://localhost:3000**
- Starts the mock API server at **http://localhost:3001**

---

## 🧩 Available Scripts

| Command | Description |
|----------|-------------|
| `dev` | Run Next.js dev server only |
| `api` | Run mock API server only |
| `dev:all` | Run both app and API concurrently |
| `build` | Build the app for production |
| `start` | Start production server |
| `lint` | Run ESLint |
| `format` | Format code with Prettier |
| `generate-mocks` | Generate fake data in `mocks/db.json` |

---

## 📦 Tech Stack

- **Next.js** 14+
- **React** 19
- **Redux Toolkit** & RTK Query
- **MUI** (Material UI)
- **Tailwind CSS**
- **json-server** (mock backend)
- **TypeScript**

---

## 💡 Tips

- If the mock API port (3001) is already in use, change it in the script:
  ```bash
  "api": "json-server mocks/db.json --port 4000"
  ```
- You can re-generate data anytime with:
  ```bash
  npm run generate-mocks
  ```

---

## 🖼️ Preview

FloBan organizes your tasks across multiple columns (e.g., **Todo**, **In Progress**, **Done**) with drag-and-drop support and mock backend persistence.

---
