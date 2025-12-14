
---

# 🍬 Sweet Shop Management System (TDD Kata)

A **full-stack Sweet Shop Management System** built using **Test-Driven Development (TDD)** principles.
This application allows users to browse and purchase sweets, while administrators can manage inventory through a secure, role-based system.

The project demonstrates clean architecture, RESTful API design, authentication, database integration, frontend UI development, and responsible AI-assisted development.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login
* JWT-based Authentication
* View all available sweets
* Search sweets by **name, category, or price range**
* Purchase sweets (disabled when out of stock)

### 🛠 Admin Features

* Add new sweets
* Update sweet details
* Delete sweets
* Restock inventory
* Role-based access control (Admin vs User)

---

## 🧱 Tech Stack

### Backend

* **Node.js + Express (TypeScript)**
* **JWT Authentication**
* **PostgreSQL** (via Prisma ORM)
* **Jest & Supertest** for TDD

### Frontend

* **React.js**
* **React Router**
* **Axios**
* **Modern dark-pastel UI design**

### Dev Tools

* Git & GitHub
* ESLint & Prettier
* Postman
* AI tools (documented below)

---

## 🗄 Database Schema (Simplified)

### User

| Field    | Type            |
| -------- | --------------- |
| id       | UUID            |
| name     | String          |
| email    | String          |
| password | String (hashed) |
| role     | USER / ADMIN    |

### Sweet

| Field    | Type   |
| -------- | ------ |
| id       | UUID   |
| name     | String |
| category | String |
| price    | Number |
| quantity | Number |

---

## 🔐 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Sweets (Protected)

```
POST   /api/sweets
GET    /api/sweets
GET    /api/sweets/search
PUT    /api/sweets/:id
DELETE /api/sweets/:id   (Admin only)
```

### Inventory (Protected)

```
POST /api/sweets/:id/purchase
POST /api/sweets/:id/restock   (Admin only)
```

---

## 🧪 Test-Driven Development (TDD)

This project strictly follows the **Red → Green → Refactor** approach.

### Backend Testing

* Unit tests for services
* Integration tests for API routes
* Authentication & authorization test cases
* Inventory edge cases (out of stock, invalid quantity, etc.)

### Tools Used

* Jest
* Supertest

### Test Coverage

* High coverage on business logic
* Meaningful assertions instead of superficial tests

📄 **Test Report:**
Run:

```bash
npm run test
```

---

## 🖥 Frontend UI

* Responsive dashboard
* Dark pastel color scheme
* Sweet cards (3 per row)
* Disabled purchase button when quantity = 0
* Admin management panel
* Clean and intuitive UX

📸 **Screenshots**

> Add screenshots here
> Example:

```
/screenshots/login.png
/screenshots/dashboard.png
/screenshots/admin-panel.png
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Samarpreet-singh13/SweetShop.git
cd sweetShop
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL= mongodb url
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

```env
VITE_BACKEND_URI=http://localhost:5000/api
```
---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔁 Git Workflow

* Frequent commits
* Descriptive commit messages
* Clear feature separation
* TDD-focused commit history

### Example Commit

```bash
feat: add purchase sweet API with stock validation

Used AI assistance to generate initial test cases,
then manually refined edge cases and logic.

Co-authored-by: ChatGPT <AI@users.noreply.github.com>
```

---

## 🤖 My AI Usage

### AI Tools Used

* **ChatGPT**
* **GitHub Copilot**

### How I Used AI

* Generated boilerplate for controllers and services
* Helped draft Jest & Supertest test cases
* Brainstormed API endpoint structure
* Assisted in frontend UI improvements and layout ideas
* Refined README documentation and commit messages

### What I Did Manually

* Business logic implementation
* Validation and authorization rules
* Refactoring after tests passed
* UI customization and styling
* Database modeling decisions

### Reflection

AI significantly improved my development speed, especially during test creation and boilerplate setup.
However, all **core logic, architectural decisions, and refactoring were done manually**, ensuring full ownership and understanding of the codebase.

---

## 🌍 Deployment (Optional)

* **Backend:** Render / Railway / Heroku
* **Frontend:** Vercel / Netlify

🔗 Live Demo: *(Add link if deployed)*

---

## 📌 Future Improvements

* Order history
* Pagination & sorting
* Role-based UI rendering
* CI/CD pipeline
* Docker support

---

## 🧑‍💻 Author

**Samarpreet Singh**
Computer Science Undergraduate
Full-Stack Developer
