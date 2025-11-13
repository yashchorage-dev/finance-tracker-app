
# 📊 Finance Tracker App

A modern and responsive personal finance management web application built using **React (Vite)** and **Firebase**.  
This app allows users to securely track income & expenses, view analytics dashboards, generate visual reports, and manage transactions in real time.

---

## ⭐ Features

###  Authentication
- Secure Login & Signup (Firebase Auth)  
- Forgot Password (email reset link)  
- Protected Dashboard & Routes  

###  Transactions
- Add Income & Expense  
- Real-time syncing with Firestore  
- Delete transactions instantly  
- Clean and responsive table UI  

### 📈 Reports
- Pie chart (Income vs Expense)  
- Line chart (Date-wise transaction trends)  
- Interactive, responsive and dynamic charts  

### 📊 Dashboard Overview
- Total Income  
- Total Expense  
- Balance  
- Recent Transactions Preview  
- Beautiful modern UI  

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js + Vite |
| Styling | Custom CSS |
| Backend | Firebase Authentication, Firestore |
| Graphs | Recharts |
| Routing | React Router v6 |
| Notifications | React Toastify |

---

## 📁 Folder Structure

```
finance-tracker-app/
│── public/
│── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Reports.jsx
│   │   ├── Settings.jsx
│   ├── layouts/
│   │   ├── SidebarLayout.jsx
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│── .gitignore
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```sh
git clone https://github.com/your-username/finance-tracker-app.git
cd finance-tracker-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

---

## 🔥 Firebase Setup

### Create a Firebase Project
1. Go to **https://console.firebase.google.com**
2. Create a new Firebase project
3. Enable **Email/Password Authentication**
4. Enable **Cloud Firestore**
5. Copy your Firebase SDK config from *Project Settings*

### Add Firebase Config  
Paste your config into `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🔐 Firestore Security Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/transactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## ▶️ Run in Development

```sh
npm run dev
```

Project runs at:

👉 **http://localhost:5173**

---

## 📦 Build for Production

```sh
npm run build
```

---

## 🌐 Deployment Options
You can deploy using:

- Firebase Hosting  
- Netlify  
- Vercel  
- GitHub Pages  

---

## 📸 Screenshots (Add after uploading)

```
/screenshots
    ├── login.png
    ├── dashboard.png
    ├── transactions.png
    ├── reports.png
```



## 👨‍💻 Author  
**Yash Chorage**  
Frontend Developer | JavaScript | React
