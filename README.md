# 🧠 UniMind – Smart Knowledge Collaboration Platform

> Hackathon Project – Dawn of Code

UniMind is a collaboration platform designed for students, researchers, and teams to **share knowledge, manage tasks, and stay connected** — all in one workspace.  
Built with **Next.js, TailwindCSS, and more**, it provides seamless **real-time collaboration** with a sleek UI.

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
SOCKET_URL=http://localhost:3001
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open 👉 [http://localhost:3000](http://localhost:3000)

---

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
├── .github/               # PR templates, contributing guide
│   └── PULL_REQUEST_TEMPLATE.md
├── .gitignore
├── CONTRIBUTING.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── README-NEXT.md
├── README.md
├── tailwind.config.js
├── pages/                 # Next.js pages & API routes
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   └── api/
│       └── hello.js
├── public/                # Static assets
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── styles/                # Global styles (Tailwind)
│   └── globals.css
└── .next/                 # Next.js build output (auto-generated)
```

---

## 📝 Notes

- Make sure you are using **Node.js v18+** for best compatibility.
- If you update Tailwind or PostCSS, check the [README](https://tailwindcss.com/docs/installation) for any config changes.
- For any issues, check the logs or open an issue/PR.

---

Happy Coding!