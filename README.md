# 🎬 MovieVerse

**A fullstack movie review and rating platform with user authentication, admin management, and live movie data from IMDb. Built with the MERN stack + RTK Query.**

---

## ✨ Features

### 👥 User Roles
- **Regular Users**
  - View all movies with advanced search and filters
  - View detailed movie pages with data fetched via IMDb ID
  - Rate and comment on movies
  - Update personal profile

- **Admins**
  - Create new movies using IMDb ID (data auto-fetched from IMDb API)
  - Manage genres
  - View and delete user comments
  - Access a custom **Admin Dashboard**
  - Manage all uploaded movies

### 🔍 Movie Features
- **Dynamic Movie Listing**  
  Browse latest and top-rated movies  
  Advanced search by:
  - Genre
  - Rating
  - Keywords (via search bar)

- **Movie Details Page**
  - Title, poster, release date, description, ratings
  - Fetched live using the IMDb API
  - User comments and reviews

### 🧠 Smart Movie Creation
Admins can **input just an IMDb ID**, and the app fetches:
- Poster
- Title
- Plot
- Cast
- Ratings
- and more...

---

## 🛠️ Tech Stack

### Frontend
- React
- Redux Toolkit & RTK Query
- React Router DOM
- Tailwind CSS (or your styling choice)
- Toastify (for notifications)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- IMDb API for movie metadata

### Authentication
- JWT Authentication
- Role-based access control (RBAC)

---


