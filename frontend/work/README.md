## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


---

# Frontend (React + Vite)

This is the **frontend** of a full-stack Workflow Management System built using **React.js (Vite)** and **Tailwind CSS**. It supports role-based dashboards for Admin, Manager, and Employee, with task assignment, tracking, comments, and submission features.

---

## 🚀 Features

- 🔐 **JWT-based Authentication**  
- 👤 **Role-Based Access** (Admin, Manager, Employee)  
- 📝 **Task Management UI:** View, assign, and track tasks  
- 💬 **Comment Threads** under each task  
- 📜 **Task History Logs**  
- 🔒 **Protected Routes** with context-based auth  
- 📁 **Modular File Structure** for scalability  
- 🎨 **Tailwind CSS** for responsive design  

---

## 🧱 Tech Stack

- ⚛️ React (with Vite)
- 🎨 Tailwind CSS
- 📦 Axios (API handling)
- 🔄 React Router
- 🧠 Context API for Auth Management

---


## 📁 Folder Structure

```
src/
├── components/
│ ├── auth/                     # Login, Signup, Logout, ProtectedRoute
│ ├── dashboard/                # participate
│ ├── tasks/                    # tasks details
│ └── common/                   # Navbar, Sidebar
├── context/                    # login state
├── routes/                     # AppRoutes.jsx
├── services/                   # API configuration 
├── utils/                      # Utility functions 
├── pages/                      # Route-based Pages 
├── App.jsx                     # Root component with routing
├── main.jsx                    # ReactDOM rendering
└── index.css                   # Tailwind base styles

```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Jyotikamble-creator/WorkFlowManager.git

cd WorkFlowManager-frontend-work
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Environment Variable
Create a .env file in the root with:

```bash
VITE_BACKEND_URL=http://localhost:5000
```
Update the URL if your backend runs on a different host/port.

### 4️⃣ Run the App

```bash
npm run dev
```

App runs locally at: http://localhost:5173

---

## 🔐 Role Access

---

## 🧑‍💻 Author

Built by Jyoti Kamble

