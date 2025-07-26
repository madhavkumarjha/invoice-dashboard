# 🧾 Invoice Dashboard

A modern, responsive **Invoice Management Dashboard** built with **React** and **Firebase**. This app includes **authentication**, **product and customer dashboards**, and **invoice tracking** using **Firestore** as the backend.

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password) and also google auth
- 🛍️ Product Management (CRUD)
- 👥 Customer Dashboard (CRUD)
- 🧾 Invoice Creation and Listing
- 🔎 Real-time Firestore integration
- 📱 Responsive UI for mobile and desktop

---

## 📸 Screenshots

<!-- Optionally add screenshots here -->
> _Coming soon: animated demo GIF or screenshots of dashboard._

---

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Firebase (Auth + Firestore)
- **State Management:** React Hooks & Context API
- **Deployment:** Firebase Hosting / Vercel (optional)

---


## 📁 Project Structure

```bash
src/
├── assets/               # Images, icons, and other static assets
├── auth/                 # Authentication-related components or logic
├── components/           # Reusable UI components
├── contexts/
│   └── authContext/      # Firebase Auth context logic
├── firebase/             # Firebase configuration and Firestore setup
├── header/               # Header/Navbar component
├── pages/                # Page-level components (Invoices, Products, etc.)
├── todoList/             # To-Do app components
├── utils/                # Utility functions/helpers
├── App.jsx               # Root component
├── App.css               # Global styles
├── index.css             # Base styles
└── main.jsx              # App entry point

root/
├── .env                  # Environment variables
├── .gitignore
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js        # Vite configuration
```


## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/invoice-dashboard.git
cd invoice-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add Firebase config
#### 🚀 Create a ``` .env ``` file in the root:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-msg-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```
#### 🛑 Don't expose your **.env** in public repos. Add **.env** to **.gitignore**.

### 4. Run the app
```bash
npm run dev
```

## 🔥 Firebase Setup Guide
### 🚀Create Firebase Project
####  Go to https://console.firebase.google.com

#### 1. Click "Add Project"

#### 2. Follow the setup steps:

##### 3. Skip Google Analytics if not needed

##### --> After creating the project, go to:

##### --> Project Settings → General → Your apps

##### --> Click </> to register a web app


## ✨ Future Improvements
- PDF Export for invoices

- Role-based access (Admin, Staff)

- Payment gateway integration

- Notifications system


## 📄 License
This project is licensed under the **MIT** License.