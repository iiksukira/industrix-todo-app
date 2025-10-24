# Industrix Full Stack Todo App

A Full Stack Todo Application built for the Industrix Coding Challenge.

---

## 🚀 Tech Stack

- **Frontend:** React, Ant Design, Context API
- **Backend:** Node.js, Express, PostgreSQL, Sequelize
- **Database:** PostgreSQL
- **Bonus:** Docker + Unit Tests

---

## ⚙️ Installation

### 1. Backend

```bash
cd backend
npm install
npx sequelize db:create
npx sequelize db:migrate
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`  
API runs on `http://localhost:5000`

---

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
- Centralized error handling via `utils/errorHandler.js`

### 4. Validation

- Backend: express-validator or manual checks
- Frontend: required fields for title & description

---

## 🧪 Tests

```bash
npm test
```

---

## ✨ Improvements (If More Time)

- Authentication (JWT)
- Unit test coverage
- Deploy via Docker
