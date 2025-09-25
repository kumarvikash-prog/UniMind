# 🧠 UniMind – Smart Knowledge Collaboration Platform

> Hackathon Project – Dawn of Code

UniMind is a collaboration platform designed for students, researchers, and teams to **share knowledge, manage tasks, and stay connected** — all in one workspace.  
Built with **Next.js, TailwindCSS, and more**, it provides seamless **real-time collaboration** with a sleek UI.

---

## 🖼 Project Preview

<!-- Paste or replace the image below -->
![Add your project screenshot here](docs/preview.png)

---

## ✨ Features

- 🔑 **Authentication** – Secure Google login via NextAuth  
- ⛓ **Knowledge Chain** – Timeline of shared notes, files, and links  
- 👥 **Dual Views** – Master timeline or member-wise contribution view  
- 💬 **Contextual Chat** – Discuss around files and tasks  
- ✅ **Task Manager** – Assign, track, and complete tasks in a Kanban view  
- 📊 **Analytics** – Contribution insights with interactive charts  
- 📂 **Shared Hub** – Central repository for team’s knowledge

---

## 🛠 Tech Stack

- **Frontend:** Next.js (React 18), TailwindCSS  
- **Auth:** NextAuth.js (Google OAuth)  
- **Database:** MongoDB Atlas + Mongoose  
- **Realtime:** Socket.IO (chat, updates)  
- **Data & Charts:** Axios + Recharts  
- **Styling:** TailwindCSS, PostCSS, Autoprefixer  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/UniMind.git
cd UniMind/UniMind
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill values in `.env.local`:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open 👉 [http://localhost:3000](http://localhost:3000)

---

## 📜 NPM Scripts

- `dev`: Start Next.js development server
- `build`: Build the Next.js app (lint disabled via `--no-lint`)
- `start`: Start the production server
- `server`: Start the Socket.IO server on port 3001
- `dev:full`: Run Next.js and Socket.IO together
- `dev:next`: Run only Next.js
- `dev:socket`: Run only the Socket.IO server
- `lint`: Run ESLint on `.js`, `.ts`, `.tsx`

Notes:
- The Socket.IO server defaults to `http://localhost:3001`.
- If port 3000 is in use, Next.js may automatically use another port (e.g., 3001).

## ✅ Verification Checklist

- TailwindCSS styling works (check styled homepage)
- `/api/test` returns `{ success: true }` (DB connected)
- Google login works and user is stored in MongoDB

---

## 🤝 Contributing Workflow

1. **Create a feature branch:**
    ```bash
    git checkout -b feature/your-feature
    ```
2. **Commit changes:**
    ```bash
    git add .
    git commit -m "feat: add your feature"
    git push origin feature/your-feature
    ```
3. **Open a Pull Request** → Get review → Merge into main.

---

## 📁 Project Structure

```
UniMind/
├── .github/                   # PR templates, contributing guide
│   └── PULL_REQUEST_TEMPLATE.md
├── .gitignore
├── CONTRIBUTING.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── .env.example
├── README.md
│
├── lib/
│   └── mongodb.js             # MongoDB connection helper
│
├── models/
│   └── User.js                # User schema
│
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.tsx              # Landing page (Google Auth)
│   └── api/
│       ├── auth/
│       │   └── [...nextauth].js   # NextAuth config
│       ├── hello.js
│       └── test.js                # DB test route
│
├── components/
│   └── Navbar.js              # UI components (Navbar, etc.)
│
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── styles/
│   └── globals.css            # Global styles (Tailwind)
│
└── .next/                     # Next.js build output (auto-generated)
```

---

## 📝 Notes

- Make sure you are using **Node.js v18+** for best compatibility.
- If you update Tailwind or PostCSS, check the [README](https://tailwindcss.com/docs/installation) for any config changes.
- For any issues, check the logs or open an issue/PR.

---

Happy Coding!