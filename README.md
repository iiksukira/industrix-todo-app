# Sales Data Visualization 📊

## 📌 Project Title

Industrix Todo App

## 📝 Description

A full-stack todo list web application built for the Industrix Full Stack Engineer Intern Coding Challenge. It features todo and category management, pagination, search, and a clean responsive UI using React and Ant Design.

## 🚀 Features Implemented

✅ Create, read, update, delete todos
✅ Mark todos as complete/incomplete
✅ Assign categories to todos
✅ CRUD for categories
✅ Pagination (10 items per page)
✅ Search todos by title
✅ Responsive design (desktop, tablet, mobile)
✅ Dockerized backend and PostgreSQL
✅ JavaScript frontend
✅ Sequelize ORM with SQL migrations

## ⚙️ Technologies Used

- Frontend: React, JavaScript, Ant Design, Vite
- State: React Context API
- Backend: Node.js + Express.js + Sequelize
- Database: PostgreSQL
- DevOps: Docker, Docker Compose

## 🛠️ Setup Instructions

1. Clone repository

```bash
git clone https://github.com/iiksukira/industrix-todo-app.git
cd industrix-todo-app
```

2. Run with Docker

`bash sudo docker compose up --build `

3. Access the app

App runs on `http://localhost:5173`  
API runs on `http://localhost:5000`

## 📘 API Documentation

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| GET    | `/api/todos`              | Get all todos     |
| POST   | `/api/todos`              | Create todo       |
| PUT    | `/api/todos/:id`          | Update todo       |
| DELETE | `/api/todos/:id`          | Delete todo       |
| PATCH  | `/api/todos/:id/complete` | Toggle completion |
| GET    | `/api/categories`         | Get categories    |

---

## 📚 Technical Answers

### 1. Database Design

- Tables: `todos`, `categories`
- Relation: `todos.category_id` → `categories.id`
- Efficient pagination via `LIMIT` & `OFFSET`

### 2. Responsive Design

- Ant Design grid breakpoints: `xs`, `sm`, `md`, `lg`
- Uses AntD Layout, responsive Table/List components

### 3. Backend Structure

- Routes → Controllers → Services → Models

### 4. Validation

- Backend: express-validator or manual checks
- Frontend: required fields for title & description
