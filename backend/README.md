# 📋 Workflow Management System
## Backend

A full-stack  Workflow Management System built with  Express.js with MongoDB on the backend. It features role-based access, task assignment, status tracking, comments, and history logs to help teams collaborate efficiently.

---

# 🚀 Live Demo

---
# 🧩 Features

### ✅ Authentication & Roles
- User registration and login (JWT-secured)

- Role-based access (Admin, Manager, Employee)

### ✅ Task Management

- Create, edit, delete tasks

- Assign tasks to employees (by managers/admins)

- Update task status: To Do, In Progress, Done

- View task details

### ✅ Collaboration

- Add comments under tasks

- View full comment threads

- Task activity log with timestamps and user actions

---
# 🧱 Tech Stack

---
# 🗂️ Folder Structure

---

# 🧾 Environment Variables

.env (at root of backend)

```ini
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_secret_jwt_key
PORT=5000
```
.env (at root of frontend or client/.env)

```bash
VITE_API_URL=http://localhost:5000/api
```
---

# ⚙️ Installation & Setup

### 1️⃣ Clone the Project
```bash
git clone https://github.com/your-username/workflow-management-system.git

cd workflow-management-system
```
### 2️⃣ Setup Backend
```bash
cd backend

npm install

npm start
```
### 3️⃣ Setup Frontend
```bash
cd client
npm install
npm run dev
```
Frontend app runs on: http://localhost:5173

---
# 📡 API Overview

---

