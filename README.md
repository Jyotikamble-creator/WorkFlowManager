# 🧩 Workflow Manager(TaskForge) - Jira-like Task Management System

A full-stack task and workflow management system built with **React.js (Vite)** on the frontend and **Express.js + MongoDB** on the backend. Designed for teams to manage tasks efficiently with role-based access for Admins, Managers, and Employees.

---

## 🚀 Features

- 🔐 **Role-Based Authentication** using JWT  
- 👥 **User Roles:** Admin, Manager, Employee  
- ✅ **Task Management:** Create, assign, update status  
- 💬 **Comment System:** Real-time threaded discussions under each task  
- 📜 **Task History Logs** and submission tracking  
- 🧾 **File Uploads:** Submit work with attachments  
- 🔎 **Dashboard Filtering** by task status and user  
- 📁 **Modular Codebase**: Reusable components and clean folder structure  
- 🌐 **RESTful API** integration  
- 🎨 **Tailwind CSS** for responsive and clean UI  

---
## 🏗️ Tech Stack

### Frontend:

- React.js (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Multer (for file uploads)

---
## 🔐 Roles & Access
| Role     | Access Description                              |
| -------- | ----------------------------------------------- |
| Admin    | View all users, manage access                   |
| Manager  | Create tasks, assign to employees, comment      |
| Employee | View assigned tasks, update status, submit work |
---
<!-- ## folder
src/
├── components/
│ ├── auth/ # Login, Signup, Logout, ProtectedRoute
│ ├── dashboard/ # Admin, Manager, Employee Dashboards
│ ├── tasks/ # TaskForm, TaskList, TaskDetails, CommentList
│ └── common/ # Navbar, Sidebar
├── context/ # AuthContext for login state
├── routes/ # AppRoutes.jsx
├── services/ # API configuration and authService
├── utils/ # Utility functions (e.g., roleUtils)
├── pages/ # Route-based Pages (LoginPage, SignupPage, etc.)
├── App.jsx # Root component with routing
├── main.jsx # ReactDOM rendering
└── index.css # Tailwind base styles

src/
├── components/
│   ├── auth/         # Login, Signup, Logout, ProtectedRoute
│   ├── dashboard/    # Role-specific dashboards
│   ├── tasks/        # TaskForm, TaskList, TaskDetails
│   └── common/       # Navbar, Sidebar
├── pages/            # LoginPage, SignupPage, DashboardPage, NotFound
├── routes/           # AppRoutes
├── context/          # AuthContext
├── services/         # api.js, authService.js
├── utils/            # Helpers like roleUtils
├── App.jsx
└── main.jsx
--- -->
---
## 📦 API Endpoints
| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | `/auth/login`         | User login             |
| POST   | `/auth/signup`        | User registration      |
| GET    | `/tasks/employee`     | Get tasks for employee |
| PUT    | `/tasks/:id/status`   | Update task status     |
| POST   | `/tasks/:id/comments` | Add comment to task    |
| POST   | `/tasks/:id/submit`   | Submit completed work  |
---
---
## 📸 Screenshots
---

## 📌 Future Improvements
- ✅ Real-time updates with Socket.io
- 📊 Analytics and reporting dashboard
- 📥 Notifications system
- 🧪 Test coverage with Jest
- 🌍 i18n support for multilingual UI

---
## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.
---
## 🙌 Acknowledgements
-  React
- Express
- MongoDB
- Tailwind CSS